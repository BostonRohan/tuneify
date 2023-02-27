"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var setAxiosHeaders = function (access_token) {
    axios_1["default"].defaults.headers.common["Authorization"] = "Bearer ".concat(access_token);
    axios_1["default"].defaults.headers.common["Content-Type"] = "application/json";
};
exports["default"] = setAxiosHeaders;
//# sourceMappingURL=setAxiosHeaders.js.map