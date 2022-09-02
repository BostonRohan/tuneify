import { Request, Response } from "express";
import { client } from "../index";

const hasRedirected = async (_req: Request, res: Response) => {
  const hasRedirected = await client.get("hasRedirected");
  //clear cache
  await client.set("hasRedirected", "");
  res.send(hasRedirected === "true");
};

export default hasRedirected;
