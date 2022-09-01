import express from "express";
import dotenv from "dotenv";
import router from "./routes/router";
import { createClient } from "redis";

dotenv.config();

const app = express();

//redis
export const client = createClient();

(async () => {
  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();
})();

//routes
app.use(router);

app.listen(8888, () => {
  console.log(`server started at http://localhost:${8888}`);
});
