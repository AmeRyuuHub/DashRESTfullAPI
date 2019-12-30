import { verify } from "jsonwebtoken";
import { sessionModel } from "../models";

const withAuth = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) throw new Error("You need to login.");

    const token = authorization.split(" ")[1];
    const { id } = verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!id) throw new Error("Token is incorrect.");
    const session = await sessionModel.findOne({ _id: id, active: true });
    if (!session) throw new Error("You need to login.");
    req.sessionId = id;
    req.userId = session.user_id;
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }

  return next();
};

export default withAuth;
