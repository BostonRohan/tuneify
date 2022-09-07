import express from "express";
import discordAuth from "../controllers/auth/discord";

const router = express.Router();

//endpoints
router.get("/discord/auth", discordAuth);

export default router;
