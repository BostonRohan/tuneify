import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  Client,
} from "discord.js";
import { Help } from "./commands/help";

export interface Command extends ChatInputApplicationCommandData {
  run: (client: Client, interaction: CommandInteraction) => void;
}

export const Commands: Command[] = [Help];
