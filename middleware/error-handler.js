"use strict";
exports.__esModule = true;
var http_status_codes_1 = require("http-status-codes");
var chalk_1 = require("chalk");
var ErrorHandlerMiddleware = function (err, _, res, _2) {
    var status = err.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    var message = err.message || "Something went wrong";
    if (err.name === "ValidationError") {
        status = http_status_codes_1.StatusCodes.BAD_REQUEST;
        message = Object.values(err.errors)
            .map(function (val) { return val.message; })
            .join(" ");
    }
    if (err.code && err.code === 11000) {
        status = http_status_codes_1.StatusCodes.BAD_REQUEST;
        message = "".concat(Object.keys(err.keyValue), " already exists");
    }
    console.log(chalk_1["default"].red(message));
    res.status(status).send({
        status: status,
        message: message
    });
};
exports["default"] = ErrorHandlerMiddleware;
