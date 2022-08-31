import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//routes
app.get("/", (_req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(8888, () => {
  console.log(`server started at http://localhost:${8888}`);
});

export default app;
