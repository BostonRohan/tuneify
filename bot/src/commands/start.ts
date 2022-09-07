import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { Command } from "../commands";
import axios from "axios";

export const Start: Command = {
  name: "start",
  description: "start by logging into your spotify account.",
  run: async (client: Client, interaction: CommandInteraction) => {
    const row: any = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setURL("")
        .setLabel("Spotify")
        .setStyle(ButtonStyle.Link)
    );

    await interaction.reply({
      ephemeral: true,
      content: "continue signing into your spotify account.",
      components: [row],
    });

    const {
      data: { display_name, images, external_urls, error },
    } = await axios.get("http://localhost:8888/loggedin");

    if (error) {
      await interaction.followUp({
        ephemeral: true,
        content: "there was an error logging you in, please try again.",
      });
    } else {
      const accountEmbed = new EmbedBuilder()
        .setColor(0xdb954)
        .setAuthor({
          name: display_name,
          iconURL: images[0].url,
          url: external_urls.spotify,
        })
        .setTimestamp();

      await interaction.followUp({
        ephemeral: true,
        content: "you are now logged in!",
        embeds: [accountEmbed],
      });
    }
  },
};
