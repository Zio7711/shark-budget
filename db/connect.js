"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var connectDB = function (url) {
    (0, mongoose_1.connect)(url);
};
exports["default"] = connectDB;
