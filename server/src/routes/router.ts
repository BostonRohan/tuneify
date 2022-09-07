import express from "express";
import discordAuth from "../controllers/auth/discord";
import spotifyAuth from "../controllers/auth/spotify";

const router = express.Router();

//endpoints
router.get("/discord/auth", discordAuth);
router.get("/spotify/auth", spotifyAuth);

export default router;
