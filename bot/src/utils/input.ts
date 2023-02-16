import { TextInputBuilder, TextInputStyle } from "discord.js";

export default (
  id: string,
  maxLength: number,
  minLength: number,
  required: boolean | undefined,
  placeholder: string,
  label: string,
  style: TextInputStyle
) =>
  new TextInputBuilder()
    .setCustomId(id)
    .setMaxLength(maxLength)
    .setMinLength(minLength)
    .setRequired(required)
    .setPlaceholder(placeholder)
    .setLabel(label)
    .setStyle(style);
