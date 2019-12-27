import { verify } from "jsonwebtoken";

export const withAuthAndRole = secure => {
  return (req, res, next) => {
    const authorization = req.headers["authorization"];
    if (!authorization) throw new Error("You need to login.");

    const token = authorization.split(" ")[1];
    try {
      const { userId, role } = verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (!userId) throw new Error("You need to login.");
      if (role < +secure) throw new Error("Access denied.");
      req.userId = userId;
    } catch (error) {
      return res.status(401).send({ message: error.message });
    }

    return next();
  };
};

export default withAuthAndRole;
