import { sign } from "jsonwebtoken";

export const createAccessToken = (userId,role) => {
  return sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m"
  });
};

export const createRefreshToken = (userId,role) => {
  return sign({ userId, role}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d"
  });
};

export const sendAccessToken = (req, res, accessToken) => {
  res.status(201).send({
    accessToken,
    login: req.body.login
  });
};

export const sendRefreshToken = (res, refreshToken) => {
  res.cookie("ssid", refreshToken, {
    httpOnly: true,
    path: "/api/auth"
  });
};
