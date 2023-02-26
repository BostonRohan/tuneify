import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from "discord-interactions";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.all("/", (req, res) => {
  res.send("Spotibot is live!");
});

app.post(
  "/interactions",
  verifyKeyMiddleware(process.env.DISCORD_PUBLIC_KEY ?? ""),
  (req, res) => {
    const message = req.body;
    if (message.type === InteractionType.APPLICATION_COMMAND) {
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "Hello world",
        },
      });
    }
  }
);

const server = () => {
  app.listen(3000, () => {
    process.env.npm_lifecycle_event === "dev" &&
      console.log(`server started at http://localhost:${3000}`);
  });
};

export default server;
