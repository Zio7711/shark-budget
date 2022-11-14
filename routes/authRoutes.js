"use strict";
exports.__esModule = true;
var authController_1 = require("../controllers/authController");
var express_1 = require("express");
var authRouter = express_1["default"].Router();
authRouter.route("/register").post(authController_1.register);
authRouter.route("/login").post(authController_1.login);
authRouter.route("/updateUser").patch(authController_1.updateUser);
exports["default"] = authRouter;
