"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var http_status_codes_1 = require("http-status-codes");
var CustomAPIError = /** @class */ (function (_super) {
    __extends(CustomAPIError, _super);
    function CustomAPIError(message, status) {
        if (status === void 0) { status = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR; }
        var _this = _super.call(this, message) || this;
        _this.status = status;
        return _this;
    }
    return CustomAPIError;
}(Error));
exports["default"] = CustomAPIError;
