import { Client, ChatInputCommandInteraction } from "discord.js";
import handleModalSubmit from "../utils/handleModalSubmit";
import { Commands } from "../commands";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
      await handleSlashCommand(client, interaction);
    }
    if (interaction.isModalSubmit()) {
      await handleModalSubmit(interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);

  if (!slashCommand) {
    interaction.reply({ content: "An error has occurred" });
    return;
  }

  slashCommand.run(client, interaction);
};
