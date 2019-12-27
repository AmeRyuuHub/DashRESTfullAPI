
import express from "express";
import { usersModel } from "../models";

const refresh = express.Router();

refresh.get("/auth", async (req, res) => {
  const userId = req.userId;
  const accessToken = req.accessToken;
  try {
    const user = await usersModel.findOne(
      { _id: userId },
      { password: 0, login: 0, createDate: 0, email: 0 }
    );
    return res.status(200).send({ token: accessToken, user: user });
  } catch (err) {
    return res.status(500).send({ accessToken: "Something wrong" });
  }
});

refresh.get("/token", (req, res) => {
  const accessToken = req.accessToken;
  return res.status(200).send({ accessToken });
});

export default refresh;
