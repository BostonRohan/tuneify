import axios from "axios";
import { ModalSubmitInteraction, CacheType } from "discord.js";
import errorInteractionReply from "./errorInteractionReply";

export default async (interaction: ModalSubmitInteraction<CacheType>) => {
  const {
    user: { id },
  } = interaction;

  try {
    const {
      data: { data },
    } = await axios.post(`${process.env.API_URL}/top25`, {
      discord_id: id,
    });

    if (data) {
      const name = interaction.fields.getTextInputValue("name");
      const email = interaction.fields.getTextInputValue("email");

      try {
        const {
          data: { data },
        } = await axios.post(`${process.env.API_URL}/top25signedup`, {
          discord_id: id,
        });

        if (data) {
          return await interaction.reply({
            ephemeral: true,
            content:
              "your submission was received successfully! `use /ta to see your top artists and /tt to see your top tracks` \n wonder why we need this data? see here: ",
          });
        } else {
          await axios.post(`${process.env.API_URL}/top25signup`, {
            discord_id: id,
            full_name: name,
            email,
          });

          return await interaction.reply({
            ephemeral: true,
            content:
              "your submission was received successfully! `use /ta to see your top artists and /tt to see your top tracks` \n wonder why we need this data? see here: ",
          });
        }
      } catch {
        return await errorInteractionReply(interaction);
      }
    } else {
      return await interaction.reply({
        ephemeral: true,
        content: "you are not a top 25 spotibot user, please try again later.",
      });
    }
  } catch {
    return await errorInteractionReply(interaction);
  }
};
