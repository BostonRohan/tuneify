import express from "express";
import discordAuth from "../controllers/auth/discord";
import spotifyAuth from "../controllers/auth/spotify";
import currentlyPlaying from "../controllers/currentlyPlaying";
import loggedIn from "../controllers/loggedIn";
import queue from "../controllers/queue";
import recentlyPlayed from "../controllers/recentlyPlayed";
import top from "../controllers/top";
import auth from "../middleware/auth";
import playlists from "../controllers/playlists";
import tracks from "../controllers/savedTracks";
import top25 from "../controllers/top25";
import top25SignUp from "../controllers/top25SignUp";
import top25SignedUp from "../controllers/top25SignedUp";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Spotibot server is live!");
});

//auth
router.get("/discord/auth", discordAuth);
router.get("/spotify/auth", spotifyAuth);

//spotify
router.post("/queue", auth, queue);
router.post("/recentlyplayed", auth, recentlyPlayed);
router.post("/currentlyplaying", auth, currentlyPlaying);
router.post("/loggedin", auth, loggedIn);
router.post("/top", auth, top);
router.post("/playlists", auth, playlists);
router.post("/savedtracks", auth, tracks);

//top 25 user
router.post("/top25", auth, top25);
router.post("/top25signup", auth, top25SignUp);
router.post("/top25signedup", auth, top25SignedUp);

export default router;
