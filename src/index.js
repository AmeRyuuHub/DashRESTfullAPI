import  'dotenv/config'
import express from 'express';
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import useragent from 'express-useragent';
import {login, logout, users, status, auth} from './routs';
import requestIp from 'request-ip';
import { isAuthWithRole } from './protection/isAuthWithRole';


let server = express();


server.use(requestIp.mw())
server.use(useragent.express());
server.use(bodyParser.json());
server.use(cookieParser());
server.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));

server.use(express.urlencoded({extended:true}));
server.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
  next();
});
server.use("/api/users",isAuthWithRole(process.env.ADMIN_MARKER), users);
server.use("/api/login",login);
server.use("/api/logout",logout);
server.use("/api/status",status);
// server.use("/api/refresh_token",refresh);
server.use("/api/auth",auth);
server.use(express.static("public"));

server.use((req, res, next) => {
  res.status(404).send("I think you are lost");
});

mongoose.connect(process.env.DB_CONNECT,{ useUnifiedTopology: true }, () =>{
    console.log("DB is connected");
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.info(`Server has started on ${PORT}`)); 

