import { Client, ChatInputCommandInteraction } from "discord.js";
import { Command } from "../commands";
import axios from "axios";
import errorInteraction from "../utils/errorInteraction";
import loggedIn from "../utils/loggedIn";
import notLoggedInInteraction from "../utils/notLoggedInInteraction";
import defaultEmbed from "../utils/defaultEmbed";
import { Track } from "./topTracks";
import { Data, External_URLS } from "./topArtists";

export const Queue: Command = {
  name: "q",
  description: "queue",
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const {
      user: { id, username, avatar },
    } = interaction;
    const discord_id = id;
    const avatarURL = interaction.user.displayAvatarURL();

    await interaction.deferReply();

    try {
      const {
        data: { error, name, iconURL, url },
      } = await loggedIn(discord_id);
      if (error) {
        await notLoggedInInteraction(interaction);
      } else {
        const {
          data: { currently_playing, queue },
        } = await axios.post("http://localhost:8888/queue", {
          discord_id,
        });

        if (queue.length) {
          const thumbnail = currently_playing
            ? currently_playing.album.images[0].url
            : queue[0].album.images[0].url;

          const embed = defaultEmbed(
            thumbnail,
            name,
            iconURL,
            url,
            username,
            avatar,
            avatarURL
          );

          embed
            .setTitle(`${username}'s Queue`)
            .setDescription(
              `Currently Playing: *${currently_playing.name}*, ${currently_playing.artists[0].name} `
            );

          queue.slice(0, 10).map((track: Track, i: number) => {
            embed.addFields({
              name: `${(i + 1).toString()}. ${track.name}`,
              value: `*${track.album.name}*, ${track.artists
                .map((artist: Data & External_URLS) => artist.name)
                .join(", ")}`,
            });
          });

          await interaction.followUp({
            embeds: [embed],
          });
        } else {
          await interaction.followUp({
            content: "there are currently no songs in your queue.",
          });
        }
      }
    } catch {
      await errorInteraction(interaction);
    }
  },
};
