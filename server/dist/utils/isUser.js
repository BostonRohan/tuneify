"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var unauthorized_1 = __importDefault(require("./unauthorized"));
var isUser = function (user) {
    if (user) {
        if (!(user === null || user === void 0 ? void 0 : user.access_token) || !user.refresh_token) {
            return {
                error: (0, unauthorized_1["default"])("spotify")
            };
        }
        else if (!(user === null || user === void 0 ? void 0 : user.discord_id)) {
            return {
                error: (0, unauthorized_1["default"])("discord")
            };
        }
        else {
            var access_token = user.access_token, refresh_token = user.refresh_token, expires_in = user.expires_in, name = user.name, url = user.url, image = user.image, requests = user.requests;
            return {
                data: {
                    access_token: access_token,
                    refresh_token: refresh_token,
                    expires_in: expires_in !== null && expires_in !== void 0 ? expires_in : new Date(Math.round(Date.now()) + 300 * 1000),
                    name: name,
                    url: url,
                    image: image,
                    requests: requests !== null && requests !== void 0 ? requests : 0
                }
            };
        }
    }
    else {
        return { error: { unauthorized: "unauthorized on both platforms" } };
    }
};
exports["default"] = isUser;
//# sourceMappingURL=isUser.js.map