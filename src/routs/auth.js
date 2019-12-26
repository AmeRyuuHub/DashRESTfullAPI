import { verify } from "jsonwebtoken";
import { sessionModel, usersModel } from "../models";
import express from "express";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken
} from "../tokens";

const auth = express.Router();

auth.get("/", async (req, res) => {
    const token = req.cookies.ssid;
    if (!token) return res.status(400).send({ message:"User is not autorized" });
    let payload = null;
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    try {
    const session = await sessionModel.findOne({ user_id: payload.userId});
    if (!session) return res.send({ error: "Session not found" });
    if (session.token !== token)
      return res.send({ error: "Token is incorrect" });
    const accessToken = createAccessToken(session.user_id, payload.role);
    const refreshToken = createRefreshToken(session.user_id, payload.role);
    await sessionModel.updateOne(
      { user_id: session.user_id },
      { $set: { token: refreshToken } }
    );
    sendRefreshToken(res, refreshToken);
    const user =await usersModel.findOne({_id:payload.userId},{password:0})
    return res.send({ token:accessToken, user: user});
  } catch (err) {
    return res.send({ accessToken: "Something wrong" });
  }
});

export default auth;