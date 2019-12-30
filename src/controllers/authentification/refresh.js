
import { usersModel } from "../../models";

export const refreshAuth = async (req, res) => {
  const userId = req.userId;
  const accessToken = req.accessToken;
  try {
    const user = await usersModel.findOne(
      { _id: userId },
      { password: 0, login: 0, createDate: 0, email: 0 , __v:0}
    );
    return res.status(200).json({ token: accessToken, fullName: user.fullName });
  } catch (err) {
    return res.status(500).json({ token: "Something wrong" });
  }
};

export const refreshToken = (req, res) => {
  const accessToken = req.accessToken;
  return res.status(200).json({ token:accessToken });
};


