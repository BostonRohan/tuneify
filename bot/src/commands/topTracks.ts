import { Client, ChatInputCommandInteraction } from "discord.js";
import { Command } from "../commands";
import errorInteraction from "../utils/errorInteraction";
import handleRangeAbbreviation from "../utils/handleRangeAbbreviation";
import loggedIn from "../utils/loggedIn";
import options from "../utils/rangeSubCommandOptions";
import top from "../utils/top";
import { Data, Image, External_URLS } from "./topArtists";
import notLoggedInInteraction from "../utils/notLoggedInInteraction";
import defaultEmbed from "../utils/defaultEmbed";
import rangeText from "../utils/rangeText";
import usernameApostrophe from "../utils/usernameApostrophe";
import dotenv from "dotenv";

dotenv.config();

interface AlbumData {
  artists: Array<Data & External_URLS>;
  available_markets: string[];
  album_type: string;
  images: Image[];
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
}

interface Album {
  album: Data & AlbumData;
}

export type Track = Album &
  Data & {
    artists: Array<Data & External_URLS>;
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: object;
    external_urls: External_URLS;
    is_local: boolean;
    popularity: number;
    preview_url: string;
    track_number: number;
  };

export const TopTracks: Command = {
  name: "tt",
  description: "find out your top tracks!",
  options,
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const {
      user: { id, username, avatar },
    } = interaction;
    const avatarURL = interaction.user.displayAvatarURL();
    const subCommand = interaction.options.getSubcommand();

    await interaction.deferReply();

    try {
      const {
        data: { name, iconURL, url, error },
      } = await loggedIn(id);

      if (error) {
        await notLoggedInInteraction(interaction);
      } else {
        const range = handleRangeAbbreviation(subCommand);

        const {
          data: { items },
        } = await top(id, range, "tracks");

        const embed = defaultEmbed(
          items[0].album.images[0].url,
          name,
          iconURL,
          url,
          username,
          avatar,
          avatarURL
        );

        items.map((track: Track, i: number) =>
          embed.addFields({
            name: `${(i + 1).toString()}. ${track.name}`,
            value: `*${track.album.name}*, ${track.artists
              .map((artist: Data & External_URLS) => artist.name)
              .join(", ")}`,
          })
        );

        embed.setTitle(
          `${usernameApostrophe(username)} Top Spotify Tracks of ${rangeText(
            range
          )}`
        );

        await interaction.followUp({
          embeds: [embed],
        });
      }
    } catch {
      await errorInteraction(interaction);
    }
  },
};
