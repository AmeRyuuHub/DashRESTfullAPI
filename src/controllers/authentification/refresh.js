
import { usersModel } from "../../models";

export const refreshAuth = async (req, res) => {
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
};

export const refreshToken = (req, res) => {
  const accessToken = req.accessToken;
  return res.status(200).send({ accessToken });
};


