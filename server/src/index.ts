import express from "express";
import dotenv from "dotenv";
import router from "./routes/router";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();

export const prisma = new PrismaClient();

//middleware
app.use(express.json());

//routes
app.use(router);

app.listen(8888, () => {
  console.log(`server started at http://localhost:${8888}`);
});
