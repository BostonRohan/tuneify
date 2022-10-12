import { Client, ChatInputCommandInteraction } from "discord.js";
import loggedIn from "../utils/loggedIn";
import { Command } from "../commands";
import top from "../utils/top";
import errorInteraction from "../utils/errorInteraction";
import toTitleCase from "../utils/toTitleCase";
import options from "../utils/rangeSubCommandOptions";
import handleRangeAbbreviation from "../utils/handleRangeAbbreviation";
import notLoggedInInteraction from "../utils/notLoggedInInteraction";
import defaultEmbed from "../utils/defaultEmbed";

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
      const { data } = await loggedIn(id);

      if (data.error) {
        await notLoggedInInteraction(interaction);
      } else {
        const {
          display_name,
          images,
          external_urls: { spotify },
        } = data;
        const range = handleRangeAbbreviation(subCommand);

        const {
          data: { items },
        } = await top(id, range, "artists");

        const embed = defaultEmbed(
          items[0].images[0].url,
          display_name,
          images[0].url,
          spotify,
          username,
          avatar,
          avatarURL
        );

        embed
          .setTitle(`${username}'s Top Spotify Artists`)
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
      }
    } catch {
      await errorInteraction(interaction);
    }
  },
};
