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
import rangeText from "../utils/rangeText";
import usernameApostrophe from "../utils/usernameApostrophe";

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

        embed.setTitle(`${usernameApostrophe(username)} Top Spotify Artists of ${rangeText(range)}`)
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
