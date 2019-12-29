
import express from "express";
import { logoutController } from "../controllers";
const logout = express.Router();

logout.post("/", logoutController);

export default logout;





