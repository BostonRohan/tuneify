"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var getToken_1 = __importDefault(require("../../utils/getToken"));
var axios_1 = __importDefault(require("axios"));
var index_1 = require("../../index");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var spotifyAuth = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, _a, access_token, refresh_token, expires_in, _b, id, display_name, images, spotify, spotify_id, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                code = req.query.code;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 5, , 6]);
                return [4 /*yield*/, (0, getToken_1["default"])({
                        code: code,
                        api: "spotify"
                    })];
            case 2:
                _a = _d.sent(), access_token = _a.access_token, refresh_token = _a.refresh_token, expires_in = _a.expires_in;
                return [4 /*yield*/, axios_1["default"].get("https://api.spotify.com/v1/me", {
                        headers: {
                            Authorization: "Bearer ".concat(access_token),
                            "Content-Type": "application/json"
                        }
                    })];
            case 3:
                _b = (_d.sent()).data, id = _b.id, display_name = _b.display_name, images = _b.images, spotify = _b.external_urls.spotify;
                spotify_id = id;
                return [4 /*yield*/, index_1.prisma.user.update({
                        where: {
                            spotify_id: spotify_id
                        },
                        data: {
                            access_token: jsonwebtoken_1["default"].sign({ access_token: access_token }, process.env.JWT_SECRET, { expiresIn: Math.round(Date.now() / 1000) + expires_in }),
                            refresh_token: jsonwebtoken_1["default"].sign({ refresh_token: refresh_token }, process.env.JWT_SECRET),
                            name: display_name,
                            image: images[0].url,
                            url: spotify,
                            expires_in: new Date(Math.round(Date.now()) + expires_in * 1000)
                        }
                    })];
            case 4:
                _d.sent();
                res.redirect("https://discord.com/channels/@me");
                return [3 /*break*/, 6];
            case 5:
                _c = _d.sent();
                res.redirect("https://discord.com/channels/@me");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports["default"] = spotifyAuth;
//# sourceMappingURL=spotify.js.map