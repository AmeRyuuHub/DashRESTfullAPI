
import express from "express";
import { getDeviceStatus, getDevicePing, getDeviceDVBC } from "../controllers";


const dashboard = express.Router();

dashboard.get("/:mac", getDeviceStatus);
dashboard.get("/:mac/ping", getDevicePing);
dashboard.get("/:mac/dvbc", getDeviceDVBC);

export default dashboard;
