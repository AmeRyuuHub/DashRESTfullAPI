
//import { sessionModel } from "../models/session.model";
import { verify } from "jsonwebtoken";
import { sessionModel } from "../models";
import express from "express";
const logout = express.Router();

logout.post("/", async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) return res.send({ accessToken: "" });
    let payload = null;

    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    const session = await sessionModel.findOne({ user_id: payload.userId });
    if (!session) return res.send({ error: "Session not found" });
    await sessionModel.updateOne(
      { user_id: session.user_id },
      { $set: { active: false, closeDate: new Date(), token: null } }
    );
    res.clearCookie("ssid", { path: "/auth" });
    return res.send({
      message: "Logged out"
    });
  } catch (error) {
    return res.send({
      error: `${error.message}`
    });
  }
});

export default logout;





