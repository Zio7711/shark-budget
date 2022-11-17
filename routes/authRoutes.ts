import { login, register, updateUser } from "../controllers/authController";

import authenticateUser from "../middleware/auth";
import express from "express";

const authRouter = express.Router();


authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/updateUser").patch(authenticateUser, updateUser);

export default authRouter;
