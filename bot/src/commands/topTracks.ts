import { Client, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
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
import axios from "axios";
import dotenv from "dotenv";
import notTop25Embed from "../utils/notTop25Embed";

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
        //see if user is top 25 user
        const {
          data: { data },
        } = await axios.post(`${process.env.API_URL}/top25`, {
          discord_id: id,
        });

        if (!data) {
          const embed = notTop25Embed(username, avatar, avatarURL).setImage(
            process.env.TOP_TRACKS_IMAGE as string
          );

          await interaction.followUp({
            embeds: [embed],
          });
        } else {
          const {
            data: { data },
          } = await axios.post(`${process.env.API_URL}/top25signedup`, {
            discord_id: id,
          });

          if (data) {
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
              `${usernameApostrophe(
                username
              )} Top Spotify Tracks of ${rangeText(range)}`
            );

            await interaction.followUp({
              embeds: [embed],
            });
          } else {
            await interaction.followUp({
              content:
                "You are a top 25 user of spotibot! Run the command `/top25` to continue :)",
            });
          }
        }
      }
    } catch {
      await errorInteraction(interaction);
    }
  },
};
