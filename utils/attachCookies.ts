import { Response } from "express";

const attachCookies = ({ res, token }: { res: Response; token: any }) => {
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // one day
    secure: process.env.NODE_ENV === "production",
  });
};
export default attachCookies;
