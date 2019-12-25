import { sign } from "jsonwebtoken";

export const createAccessToken = userId => {
  return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m"
  });
};

export const createRefreshToken = userId => {
  return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d"
  });
};

export const sendAccessToken = (req, res, accessToken) => {
  res.send({
    accessToken,
    login: req.body.login
  });
};

export const sendRefreshToken = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/refresh_token"
  });
};
