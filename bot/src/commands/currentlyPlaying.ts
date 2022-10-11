import { External_URLS } from "./topArtists";
import { Client, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import loggedIn from "../utils/loggedIn";
import { Command } from "../commands";
import axios from "axios";
import errorInteraction from "../utils/errorInteraction";
import notLoggedInInteraction from "../utils/notLoggedInInteraction";

export const CurrentlyPlaying: Command = {
  name: "np",
  description: "now playing",
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const {
      user: { id, username, avatar },
    } = interaction;
    const discord_id = id;
    const avatarURL = interaction.user.displayAvatarURL();

    await interaction.deferReply();

    try {
      const { data } = await loggedIn(discord_id);

      if (data.error) {
        await notLoggedInInteraction(interaction);
      } else {
        const {
          display_name,
          images,
          error,
          external_urls: { spotify },
        } = data;
        const {
          data: { item },
        } = await axios.post("http://localhost:8888/currentlyplaying", {
          discord_id,
        });

        if (item) {
          const embed = new EmbedBuilder()
            .setColor(0xdb954)
            .setTitle(`${username} is now playing`)
            .setDescription(`*${item.name}*, ${item.artists[0].name}`)
            .setThumbnail(item.album.images[0].url)
            .setAuthor({
              name: display_name,
              iconURL: images[0].url,
              url: spotify,
            })
            .setFooter({
              text: username,
              ...(avatar && { iconURL: avatarURL }),
            })
            .setTimestamp();

          await interaction.followUp({
            embeds: [embed],
          });
        } else {
          await interaction.followUp({
            content: "you are currently not listening to any content.",
          });
        }
      }
    } catch {
      await errorInteraction(interaction);
    }
  },
};
