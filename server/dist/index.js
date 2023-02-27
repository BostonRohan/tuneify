"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.prisma = void 0;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var router_1 = __importDefault(require("./routes/router"));
var client_1 = require("@prisma/client");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
exports.prisma = new client_1.PrismaClient();
//middleware
app.use(express_1["default"].json());
//routes
app.use(router_1["default"]);
app.listen(8888, function () {
    process.env.npm_lifecycle_event === 'dev' && console.log("server started at http://localhost:".concat(8888));
});
//# sourceMappingURL=index.js.map