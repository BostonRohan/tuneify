"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var getTokenData = function (_a) {
    var api = _a.api, refresh_token = _a.refresh_token, code = _a.code;
    if (api === "discord") {
        return {
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            code: code,
            grant_type: "authorization_code",
            redirect_uri: process.env.DISCORD_REDIRECT_URI,
            scope: "identify connections"
        };
    }
    else {
        if (refresh_token) {
            return {
                grant_type: "refresh_token",
                refresh_token: refresh_token
            };
        }
        else
            return {
                code: code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                grant_type: "authorization_code"
            };
    }
};
exports["default"] = getTokenData;
//# sourceMappingURL=getTokenData.js.map