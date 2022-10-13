import { External_URLS, Image, Data } from "./topArtists";
import axios from "axios";
import { Client, ChatInputCommandInteraction } from "discord.js";
import errorInteraction from "../utils/errorInteraction";
import { Command } from "../commands";
import loggedIn from "../utils/loggedIn";
import notLoggedInInteraction from "../utils/notLoggedInInteraction";
import defaultEmbed from "../utils/defaultEmbed";

interface Owner extends Omit<Data, "name"> {
  display_name: string;
  external_urls: External_URLS;
}

interface Playlist extends Data {
  collaborative: boolean;
  description: string;
  external_urls: External_URLS;
  images: Image[];
  owner: Owner;
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
}

export const Playlists: Command = {
  name: "pl",
  description: "playlists",
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
          data: { items },
        } = await axios.post("http://localhost:8888/playlists", {
          discord_id,
        });

        //filters out private playlists
        //filters out possible empty image arrays
        const playlists = items.filter((playlist: Playlist) => playlist.public);
        const images = playlists
          .map((playlist: Playlist) => playlist.images)
          .filter((image: Image[]) => image.length);

        const embed = defaultEmbed(
          images[0][0].url,
          name,
          iconURL,
          url,
          username,
          avatar,
          avatarURL
        );

        embed.setTitle(`${username}'s Playlists`);

        playlists.map((playlist: Playlist) => {
          embed.addFields({
            name: playlist.name,
            value: `[View ${playlist.name} on Spotify](${playlist.external_urls.spotify})`,
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
