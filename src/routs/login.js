

import express from 'express';
import { loginController } from "../controllers";

const login = express.Router();

login.post("/", loginController);

export default login;


