
import express from "express";
import { logoutController } from "../controllers";
const logout = express.Router();

logout.patch("/", logoutController);

export default logout;





