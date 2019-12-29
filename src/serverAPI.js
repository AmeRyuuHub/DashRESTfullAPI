import  'dotenv/config'
import express from 'express';
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import useragent from 'express-useragent';
import requestIp from 'request-ip';
import app from './app';


let server = express();

server.use(requestIp.mw());
server.use(useragent.express());
server.use(bodyParser.json());
server.use(cookieParser());
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

server.use(express.urlencoded({ extended: true }));
server.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
  next();
});
server.use("/api/v1", app);
server.use(express.static("public"));

server.use((req, res, next) => {
  res.status(404).send("I think you are lost");
});

mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true }, () => {
  console.log("DB is connected");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.info(`Server has started on ${PORT}`)); 

 