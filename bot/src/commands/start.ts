import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  CommandInteraction,
} from "discord.js";
import url from "../utils/authUrl";
import { Command } from "../commands";

export const Start: Command = {
  name: "start",
  description: "start by logging into your spotify account.",
  run: async (client: Client, interaction: CommandInteraction) => {
    //type for row??
    const row: any = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setURL(url)
        .setLabel("Spotify")
        .setStyle(ButtonStyle.Link)
    );

    await interaction.reply({
      ephemeral: true,
      content: "continue signing into your spotify account.",
      components: [row],
    });
  },
};
