import { CommandInteraction } from "discord.js";

export default async (interaction: CommandInteraction) => {
  return await interaction.followUp({
    ephemeral: true,
    content: "there was an error running this command, please try again.",
  });
};
