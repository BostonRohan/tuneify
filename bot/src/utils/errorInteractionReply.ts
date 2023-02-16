import { CacheType, ModalSubmitInteraction } from "discord.js";

export default async (interaction: ModalSubmitInteraction<CacheType>) => {
  return await interaction.reply({
    ephemeral: true,
    content: "there was an error running this command, please try again.",
  });
};
