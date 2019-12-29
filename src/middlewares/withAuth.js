import { verify } from "jsonwebtoken";

const withAuth = (req, res, next) => {
  try {
  const authorization = req.headers["authorization"];
  if (!authorization) throw new Error("You need to login.");

  const token = authorization.split(" ")[1];
  
    const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!userId) throw new Error("You need to login.");
    req.userId = userId;
  } catch (error) {
     return res.status(401).send({message: error.message})
  }
  
  return next();
};

export default withAuth;