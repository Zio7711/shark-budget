import { login, register, updateUser } from "../controllers/authController";

import express from "express";

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/updateUser").patch(updateUser);

export default authRouter;
