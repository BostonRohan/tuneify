import express from "express";
import loggedIn from "../controllers/loggedIn";
import discordAuth from "../controllers/auth/discord";
import hasRedirected from "../controllers/hasRedirected";

const router = express.Router();

//endpoints
router.get("/discord/auth", discordAuth);
router.post("/loggedIn", loggedIn);
router.get("/redirected", hasRedirected);

export default router;
