"use strict";
exports.__esModule = true;
exports["default"] = (function (req, name, url, iconURL) {
    name ? req.name = name : req.name = undefined;
    url ? req.url = url : req.url = '';
    iconURL ? req.iconURL = iconURL : req.iconURL = undefined;
});
//# sourceMappingURL=setReqHeaders.js.map