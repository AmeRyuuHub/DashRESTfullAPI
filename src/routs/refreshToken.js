import { verify } from "jsonwebtoken";
import { sessionModel } from "../models";
import express from "express";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken
} from "../tokens";

const refresh = express.Router();

refresh.post("/", async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.send({ accessToken: "" });
    let payload = null;
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    try {
    const session = (await sessionModel.find({ user_id: payload.userId }))[0];
    if (!session) return res.send({ error: "Session not found" });
    if (session.token !== token)
      return res.send({ error: "Token is incorrect" });
    const accessToken = createAccessToken(session.user_id, payload.role);
    const refreshToken = createRefreshToken(session.user_id, payload.role);
    const updateSession = await sessionModel.updateOne(
      { user_id: session.user_id },
      { $set: { token: refreshToken } }
    );
    sendRefreshToken(res, refreshToken);
    return res.send({ accessToken });
  } catch (err) {
    return res.send({ accessToken: "Something wrong" });
  }
});

export default refresh;
