import {
  Client,
  ChatInputCommandInteraction,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalActionRowComponentBuilder,
} from "discord.js";
import { Command } from "../commands";
import errorInteraction from "../utils/errorInteraction";
import dotenv from "dotenv";
import input from "../utils/input";

dotenv.config();

export const Top25: Command = {
  name: "top25",
  description: "*secret* command only for top25 users ;)",
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    try {
      const modal = new ModalBuilder()
        .setCustomId("top25")
        .setTitle("Sign up for Top Artists and Tracks!");

      const nameInput = input(
        "name",
        50,
        5,
        true,
        "John Doe",
        "Full Name *Case Sensitive*",
        TextInputStyle.Short
      );
      const emailInput = input(
        "email",
        75,
        3,
        true,
        "johndoe@gmail.com",
        "Email",
        TextInputStyle.Short
      );

      const firstActionRow =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          nameInput
        );
      const secondActionRow =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          emailInput
        );

      modal.addComponents(firstActionRow, secondActionRow);

      await interaction.showModal(modal);
    } catch {
      await errorInteraction(interaction);
    }
  },
};
