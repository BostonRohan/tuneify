import { Client } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";
import server from "./server";

require("dotenv").config();

console.log("Bot is starting...");

server();

const client = new Client({
  intents: [],
});

ready(client);
interactionCreate(client);

client.login(process.env.DISCORD_BOT_TOKEN);
