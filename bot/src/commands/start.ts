import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  CommandInteraction,
  ComponentType,
} from "discord.js";
import { Command } from "../commands";
import dotenv from "dotenv";
import loggedIn from "../utils/loggedIn";
import loggedInInteraction from "../utils/loggedInInteraction";
import errorInteraction from "../utils/errorInteraction";

dotenv.config();

export const Start: Command = {
  name: "start",
  description: "start by logging in.",
  run: async (client: Client, interaction: CommandInteraction) => {
    const {
      user: { id },
    } = interaction;

    await interaction.deferReply();

    try {
      const {
        data: { display_name, images, external_urls, error },
      } = await loggedIn(id);

      if (error) {
        const { unauthorized } = error;

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setURL(process.env.DISCORD_AUTH_URL as string)
            .setLabel("Discord")
            .setStyle(ButtonStyle.Link),
          new ButtonBuilder()
            .setCustomId("confirm")
            .setLabel("Confirm")
            .setStyle(ButtonStyle.Success)
        );

        const msg = await interaction.followUp({
          ephemeral: true,
          content:
            unauthorized === "discord"
              ? "click to authorize spotibot with discord, then click confirm when finished. \n **before clicking, make sure your spotify account is connected to your discord.**"
              : "there was an issue authorizing your spotify account. please try again.",
          components: [row],
        });

        msg
          .createMessageComponentCollector({
            componentType: ComponentType.Button,
          })
          .on("collect", async (btn) => {
            btn.deferUpdate();
            try {
              const {
                data: { display_name, images, external_urls, error },
              } = await loggedIn(id);

              if (error) {
                await interaction.followUp({
                  content: "you are not logged in, please try again.",
                });
              } else {
                await loggedInInteraction(
                  interaction,
                  display_name,
                  images[0].url,
                  external_urls.spotify
                );
              }
            } catch {
              await errorInteraction(interaction);
            }
          });
      } else {
        await loggedInInteraction(
          interaction,
          display_name,
          images[0].url,
          external_urls.spotify
        );
      }
    } catch {
      await errorInteraction(interaction);
    }
  },
};
