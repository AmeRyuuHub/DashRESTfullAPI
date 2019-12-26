import { verify } from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) throw new Error("You need to login.");

  const token = authorization.split(" ")[1];
  try {
    const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!userId) throw new Error("You need to login.");
    req.userId = userId;
  } catch (error) {
      res.status(401).send({message: error.message})
  }
  
  return next();
};
