import express, { Request, Response } from "express";

const router = express.Router();

//endpoints
router.get("/", (_req: Request, res: Response) => {
  res.redirect("https://discord.com/channels/@me");
});

export default router;
