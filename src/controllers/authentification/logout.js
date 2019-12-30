import { verify } from "jsonwebtoken";
import { sessionModel } from "../../models";


const logoutController = async (req, res) => {
  try {
    const sessionId = req.sessionId
    const session = await sessionModel.updateOne(
      { _id: sessionId, active:true},
      { $set: { active: false, closeDate: new Date(), token: null } }
    );
    if (!session.nModified) throw new Error("Session not found");
    res.clearCookie("ssid", { path: "/api/v1/refresh" });
    return res.send({
      message: "Loggout success"
    });
  } catch (error) {
    return res.send({
      error: `${error.message}`
    });
  }
};

export default logoutController;





