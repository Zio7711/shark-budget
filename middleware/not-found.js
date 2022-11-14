"use strict";
exports.__esModule = true;
var NotFoundMiddleware = function (req, res) {
    res.status(404).send("Route does not exist!");
};
exports["default"] = NotFoundMiddleware;
