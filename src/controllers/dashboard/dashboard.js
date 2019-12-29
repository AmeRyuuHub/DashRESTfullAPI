import { statusModel, pingModel, dvbcModel } from "../../models";
import { getDeviceInfo } from "./getDeviceInfo";


export const getDeviceStatus = getDeviceInfo(statusModel,"one");
export const getDevicePing = getDeviceInfo(pingModel);
export const getDeviceDVBC = getDeviceInfo(dvbcModel);


