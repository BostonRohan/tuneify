"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var querystring_1 = __importDefault(require("querystring"));
var scope_1 = __importDefault(require("../utils/scope"));
var state_1 = __importDefault(require("../utils/state"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
exports["default"] = "https://accounts.spotify.com/authorize?" +
    querystring_1["default"].stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope_1["default"],
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        state: state_1["default"]
    });
//# sourceMappingURL=spotifyUrl.js.map