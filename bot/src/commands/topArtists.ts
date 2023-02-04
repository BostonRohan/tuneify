import { Client, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import loggedIn from "../utils/loggedIn";
import { Command } from "../commands";
import top from "../utils/top";
import errorInteraction from "../utils/errorInteraction";
import toTitleCase from "../utils/toTitleCase";
import options from "../utils/rangeSubCommandOptions";
import handleRangeAbbreviation from "../utils/handleRangeAbbreviation";
import notLoggedInInteraction from "../utils/notLoggedInInteraction";
import defaultEmbed from "../utils/defaultEmbed";
import rangeText from "../utils/rangeText";
import usernameApostrophe from "../utils/usernameApostrophe";
import axios from "axios";
import dotenv from "dotenv";
import notTop25Embed from "../utils/notTop25Embed";

dotenv.config();

export type Image = {
  height: number | null;
  url: string;
  width: number | null;
};

export type External_URLS = {
  spotify: string;
};

export interface Data {
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Artist extends Data {
  external_urls: External_URLS;
  followers: { href: string | null; total: number };
  genres: string[];
  images: Image[];
  popularity: number;
}

export const TopArtists: Command = {
  name: "ta",
  description: "find out your top artists!",
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
            process.env.TOP_ARTISTS_IMAGE as string
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
            } = await top(id, range, "artists");

            const embed = defaultEmbed(
              items[0].images[0].url,
              name,
              iconURL,
              url,
              username,
              avatar,
              avatarURL
            );

            embed
              .setTitle(
                `${usernameApostrophe(
                  username
                )} Top Spotify Artists of ${rangeText(range)}`
              )
              .setDescription(`*${toTitleCase(range.replace(/_/g, " "))}*`);

            items.map((artist: Artist, i: number) =>
              embed.addFields({
                name: `${(i + 1).toString()}. ${artist.name}`,
                value: artist.genres
                  .slice(0, 2)
                  .map((genre) => toTitleCase(genre) || "genre not listed")
                  .join(", "),
              })
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
    } catch (err) {
      await errorInteraction(interaction);
    }
  },
};
