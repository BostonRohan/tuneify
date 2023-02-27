"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var discord_1 = __importDefault(require("../controllers/auth/discord"));
var spotify_1 = __importDefault(require("../controllers/auth/spotify"));
var currentlyPlaying_1 = __importDefault(require("../controllers/currentlyPlaying"));
var loggedIn_1 = __importDefault(require("../controllers/loggedIn"));
var queue_1 = __importDefault(require("../controllers/queue"));
var recentlyPlayed_1 = __importDefault(require("../controllers/recentlyPlayed"));
var top_1 = __importDefault(require("../controllers/top"));
var auth_1 = __importDefault(require("../middleware/auth"));
var playlists_1 = __importDefault(require("../controllers/playlists"));
var savedTracks_1 = __importDefault(require("../controllers/savedTracks"));
var top25_1 = __importDefault(require("../controllers/top25"));
var top25SignUp_1 = __importDefault(require("../controllers/top25SignUp"));
var top25SignedUp_1 = __importDefault(require("../controllers/top25SignedUp"));
var router = express_1["default"].Router();
router.get("/", function (req, res) {
    res.send("Spotibot server is live!");
});
//auth
router.get("/discord/auth", discord_1["default"]);
router.get("/spotify/auth", spotify_1["default"]);
//spotify
router.post("/queue", auth_1["default"], queue_1["default"]);
router.post("/recentlyplayed", auth_1["default"], recentlyPlayed_1["default"]);
router.post("/currentlyplaying", auth_1["default"], currentlyPlaying_1["default"]);
router.post("/loggedin", auth_1["default"], loggedIn_1["default"]);
router.post("/top", auth_1["default"], top_1["default"]);
router.post("/playlists", auth_1["default"], playlists_1["default"]);
router.post("/savedtracks", auth_1["default"], savedTracks_1["default"]);
//top 25 user
router.post("/top25", auth_1["default"], top25_1["default"]);
router.post("/top25signup", auth_1["default"], top25SignUp_1["default"]);
router.post("/top25signedup", auth_1["default"], top25SignedUp_1["default"]);
exports["default"] = router;
//# sourceMappingURL=router.js.map