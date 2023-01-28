import { Client, ChatInputCommandInteraction } from "discord.js";
import loggedIn from "../utils/loggedIn";
import { Command } from "../commands";
import axios from "axios";
import errorInteraction from "../utils/errorInteraction";
import notLoggedInInteraction from "../utils/notLoggedInInteraction";
import defaultEmbed from "../utils/defaultEmbed";
import dotenv from "dotenv";

dotenv.config();

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
      const {
        data: { name, iconURL, url, error },
      } = await loggedIn(discord_id);

      if (error) {
        await notLoggedInInteraction(interaction);
      } else {
        const {
          data: { item },
        } = await axios.post(`${process.env.API_URL}/currentlyplaying`, {
          discord_id,
        });

        if (item) {
          const embed = defaultEmbed(
            item.album.images[0].url,
            name,
            iconURL,
            url,
            username,
            avatar,
            avatarURL
          );

          embed
            .setTitle(`${username} is now playing`)
            .setDescription(`*${item.name}*, ${item.artists[0].name}`);

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
