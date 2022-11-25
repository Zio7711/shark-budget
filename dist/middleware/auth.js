import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
const authenticateUser = (req, res, next) => {
    // Do something
    // const headers = req.headers;
    // const token = headers.authorization;
    // if (!token || !token.startsWith("Bearer")) {
    //   throw new UnauthenticatedError("Authentication failed");
    // }
    const token = req.cookies.token;
    if (!token) {
        throw new UnauthenticatedError("Authentication failed");
    }
    // const tokenString = token.split(" ")[1];
    const tokenString = token;
    try {
        const payload = jwt.verify(tokenString, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next();
    }
    catch (error) {
        throw new UnauthenticatedError("Authentication failed");
    }
};
export default authenticateUser;
