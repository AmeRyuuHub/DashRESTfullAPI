import { verify } from "jsonwebtoken";
import { sessionModel } from "../models";
import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken
  } from "../tokens";
  
const withCookieAuth = async (req, res, next) => {
    const token = req.cookies.ssid;
    if (!token) return res.status(401).send({ message:"User is not autorized." });
  try {
    const { id, role } = verify(token, process.env.REFRESH_TOKEN_SECRET);
    if (!id) throw new Error("You need to login.");
    const session = await sessionModel.findOne({ _id: id, active:true });
    if (!session) return res.status(404).send({ error: "Session not found." });
    const accessToken = createAccessToken(id, role);
    const refreshToken = createRefreshToken(id, role);
    await sessionModel.updateOne(
        { _id: id },
        { $set: { token: refreshToken } }
      );
      sendRefreshToken(res, refreshToken);
    req.userId = session.user_id;
    req.accessToken = accessToken;
  } catch (error) {
   
     return res.status(401).send({ message: error.message , error: error})
  }
  return next();
};

export default withCookieAuth;





   
    
   
   
   
    
   
    
 
    
