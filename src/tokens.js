import { sign } from "jsonwebtoken";

export const createAccessToken = (id,role) => {
  return sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "45m"
  });
};

export const createRefreshToken = (id,role) => {
  return sign({ id, role}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d"
  });
};

export const sendAccessToken = (req, res, accessToken, fullName) => {
  res.status(201).send({
    token:accessToken,
    fullName: fullName,
  });
};

export const sendRefreshToken = (res, refreshToken) => {
  res.cookie("ssid", refreshToken, {
    httpOnly: true,
    path: "/api/v1/refresh"
  });
};
