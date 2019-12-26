// import { usersModel } from "../models/users.model";
// import { sessionModel } from "../models/session.model";
import express from 'express';
import { isAuth } from '../isAuth';

const status = express.Router();


status.get('/', async (req, res) => {
    try {
      const userId = isAuth(req);
      if (userId) {
        res.send({
          data: 'This is protected data.',
        });
      }
    } catch (err) {
      res.send({
        error: `${err.message}`,
      });
    }
  });

  export default status;