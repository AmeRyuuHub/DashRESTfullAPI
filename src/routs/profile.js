import express from 'express';
import { getProfile, updateProfile, changeProfilePassword, deleteProfile } from "../controllers";

const profile = express.Router();

profile.get('/',  getProfile);
profile.patch("/", updateProfile);
profile.patch("/password", changeProfilePassword);
profile.delete("/", deleteProfile);

export default profile;


