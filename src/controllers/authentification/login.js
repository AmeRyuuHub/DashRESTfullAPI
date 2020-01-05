
import { sessionModel, usersModel } from "../../models";
import { compare } from 'bcryptjs';
import { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } from '../../tokens';

const loginController = async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await usersModel.findOne({ login: login });
    if (!user) throw new Error("User not found");
    const valid = await compare(password, user.password);
    if (!valid) throw new Error("Login or Password are not correct");
    const clientDevice = req.useragent.isDesktop
      ? "Desktop"
      : req.useragent.isMobile
      ? "Mobile"
      : req.useragent.isTablet
      ? "Tablet"
      : req.useragent.isSmartTV
      ? "SmartTV"
      : req.useragent.isBot
      ? "Bot"
      : "Unknown";
    const checkSession = await sessionModel.findOne({user_id:user._id, active:true, device: clientDevice,
      browser: req.useragent.browser,
      version: req.useragent.version,
      os: req.useragent.os,
      platform: req.useragent.platform,
      ip: req.clientIp});
     
    if (!!checkSession) { 
      const checkTime = new Date().getTime() - checkSession.createDate.getTime() > 3600000;
      if (!checkTime) throw new Error("Session already started")
      await sessionModel.updateOne({_id:checkSession._id},{$set: { active: false, closeDate: new Date(), token: null }});}

    
    
    let model = new sessionModel({
      user_id: user._id,
      token: null,
      device: clientDevice,
      browser: req.useragent.browser,
      version: req.useragent.version,
      os: req.useragent.os,
      platform: req.useragent.platform,
      ip: req.clientIp
    });

    let sessionSaved = await model.save();
    const accessToken = createAccessToken(sessionSaved._id, user.role);
    const refreshToken = await createRefreshToken(sessionSaved._id, user.role);
    await sessionModel.updateOne({_id:sessionSaved._id},{$set: { token:refreshToken}});

    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken, user.fullName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default loginController;


