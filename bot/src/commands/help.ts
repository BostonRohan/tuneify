import { CommandInteraction, Client } from "discord.js";
import { Command } from "../commands";

export const Help: Command = {
  name: "help",
  description: "need help?",
  run: async (client: Client, interaction: CommandInteraction) => {
    const content =
      "For commands list: `/commands` \n Built by: *Boston Rohan* \n Need additional help? Contact me at: `Boss#3167`";

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
