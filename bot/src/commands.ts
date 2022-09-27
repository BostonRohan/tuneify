import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  Client,
  ChatInputCommandInteraction,
} from "discord.js";
import { Help } from "./commands/help";
import { Start } from "./commands/start";
import { TopArtists } from "./commands/topArtists";

export interface Command extends ChatInputApplicationCommandData {
  run: (client: Client, interaction: ChatInputCommandInteraction) => void;
}

export const Commands: Command[] = [Help, Start, TopArtists];
