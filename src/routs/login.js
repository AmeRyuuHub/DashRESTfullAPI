
import { sessionModel, usersModel } from "../models";
import express from 'express';
import { compare } from 'bcryptjs';
const login = express.Router();
import { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } from '../tokens';

login.post("/", async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await usersModel.findOne({ login: login });
    if (!user) throw new Error("User not found");
    const valid = await compare(password, user.password);
    if (!valid) throw new Error("Login or Password are not correct");
    const checkSession = await sessionModel.findOne({user_id:user._id, active:true});
    if (!!checkSession)  throw new Error("Session already started");
    const accessToken = createAccessToken(user._id, user.role);
    const refreshToken = createRefreshToken(user._id, user.role);
    const clientDevice = req.useragent.isDesktop
      ? "Desktop"
      : req.useragent.isMobile
      ? "Mobile"
      : req.useragent.isTablet
      ? "Tablet"
      : req.useragent.isSmartTV
      ? "SmartTV"
      : req.useragent.isBot
      ? "Bot"
      : "Unknown";
    let model = new sessionModel({
      user_id: user._id,
      token: refreshToken,
      device: clientDevice,
      browser: req.useragent.browser,
      version: req.useragent.version,
      os: req.useragent.os,
      platform: req.useragent.platform,
      ip: req.clientIp
    });

    await model.save();
    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default login;


