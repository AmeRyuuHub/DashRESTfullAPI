import { verify } from "jsonwebtoken";
import { sessionModel } from "../models";
import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken
  } from "../tokens";
  
const withCookieAuth = async (req, res, next) => {
    const token = req.cookies.ssid;
    if (!token) return res.status(400).send({ message:"User is not autorized." });
  try {
    const { userId, role } = verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!userId) throw new Error("You need to login.");
    const session = await sessionModel.findOne({ user_id: userId, token:token });
    if (!session) return res.status(400).send({ error: "Session not found." });
    const accessToken = createAccessToken(userId, role);
    const refreshToken = createRefreshToken(userId, role);
    await sessionModel.updateOne(
        { user_id: userId },
        { $set: { token: refreshToken } }
      );
      sendRefreshToken(res, refreshToken);
    req.userId = userId;
    req.accessToken = accessToken;
  } catch (error) {
     return res.status(401).send({ message: error.message })
  }
  return next();
};

export default withCookieAuth;





   
    
   
   
   
    
   
    
 
    
