
import express from "express";
import { refreshAuth, refreshToken } from "../controllers";

const refresh = express.Router();

refresh.get("/auth", refreshAuth);
refresh.get("/token", refreshToken);

export default refresh;
