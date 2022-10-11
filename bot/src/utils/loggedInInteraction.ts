import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export default async (
  interaction: ChatInputCommandInteraction,
  name: string,
  iconURL: string,
  url: string
) => {
  const accountEmbed = new EmbedBuilder()
    .setColor(0xdb954)
    .setAuthor({
      name,
      iconURL,
      url,
    })
    .setTimestamp();

  return await interaction.followUp({
    ephemeral: true,
    content:
      "you are now logged in! \n `/commands` to view the list of commands.",
    embeds: [accountEmbed],
  });
};
