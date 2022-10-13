import axios from "axios";
import { Client, ChatInputCommandInteraction } from "discord.js";
import errorInteraction from "../utils/errorInteraction";
import loggedIn from "../utils/loggedIn";
import notLoggedInInteraction from "../utils/notLoggedInInteraction";
import { Command } from "../commands";
import defaultEmbed from "../utils/defaultEmbed";
import { Track } from "./topTracks";
import { Data, External_URLS } from "./topArtists";

interface TrackObj {
  track: Track;
}

export const RecentlyPlayed: Command = {
  name: "rp",
  description: "recently played",
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const {
      user: { id, username, avatar },
    } = interaction;
    const discord_id = id;
    const avatarURL = interaction.user.displayAvatarURL();

    await interaction.deferReply();

    try {
      const {
        data: { error, name, url, iconURL },
      } = await loggedIn(discord_id);
      if (error) {
        await notLoggedInInteraction(interaction);
      } else {
        const {
          data: { items },
        } = await axios.post("http://localhost:8888/recentlyplayed", {
          discord_id,
        });

        const embed = defaultEmbed(
          items[0].track.album.images[0].url,
          name,
          iconURL,
          url,
          username,
          avatar,
          avatarURL
        );

        embed.setTitle(`${username}'s Recently Played`);

        items.map((obj: TrackObj, i: number) => {
          const { track } = obj;
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
      }
    } catch {
      await errorInteraction(interaction);
    }
  },
};
