import express, { Request, Response } from "express";
import loggedIn from "../controllers/loggedIn";
import auth from "../middleware/auth";

const router = express.Router();

//endpoints
router.get("/", auth, (req: Request, res: Response) => {
  res.redirect("https://discord.com/channels/@me");
});
router.get("/loggedIn", auth, loggedIn);

export default router;
