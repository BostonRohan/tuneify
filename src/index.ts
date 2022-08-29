import { Client } from "discord.js";

require("dotenv").config();

console.log("Bot is starting...");

const client = new Client({
  intents: [],
});

client.login(process.env.token);

console.log(client);
