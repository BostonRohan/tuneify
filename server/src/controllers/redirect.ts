import { Request, Response } from "express";
import { client } from "../index";

const redirect = async (_req: Request, res: Response) => {
  await client.set("hasRedirected", "true");
  res.redirect("https://discord.com/channels/@me");
};

export default redirect;
