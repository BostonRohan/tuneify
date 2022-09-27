import {
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
} from "discord.js";

export default [
  {
    type: ApplicationCommandOptionType.Subcommand,
    name: "st",
    description: "short-term: aprox. last 4 weeks",
  },
  {
    type: ApplicationCommandOptionType.Subcommand,
    name: "mt",
    description: "medium-term: aprox. last 6 months",
  },
  {
    type: ApplicationCommandOptionType.Subcommand,
    name: "lt",
    description: "long-term: aprox. all-time",
  },
] as ApplicationCommandOptionData[];
