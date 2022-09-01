import express, { Request, Response } from "express";
import auth from "../middleware/auth";

const router = express.Router();

//endpoints
router.get("/", auth, (req: Request, res: Response) => {
  res.redirect("https://discord.com/channels/@me");
});

export default router;
