import { ChatInputCommandInteraction } from "discord.js";

export default async (interaction: ChatInputCommandInteraction) => {
  return await interaction.followUp({
    content: "you are not logged in please retry the `/start` command.",
    ephemeral: true,
  });
};
