import { usersModel } from "../models/users.model";
import express from 'express';
import { hash, compare } from 'bcryptjs';
const login = express.Router();
import { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } from '../tokens';

login.get('/', async (req,res) =>{
    const { login, password } = req.body;

    try {

        const user = await usersModel.find({login:login});
        if (!!user) throw new Error ("User does not found");
        const valid = await compare(password, user.password);
        if (!!valid) throw new Error("Password not correct");

        const accessToken =createAccessToken(user.id);
        const refreshToken =createRefreshToken(user.id);

        res.status(200).json(usersList)
    } catch (error) {
        res.status(500).json(error); 
    }
   
})

login.post("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }
let hashedPassword = await hash(req.body.password, 10)

  let model = new usersModel({
      name:req.body.name,
      fullName: req.body.fullName,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,});
  try {
    const saveUser = await model.save();
    if (!saveUser || saveUser.length === 0) {
      return res.status(500).send(saveUser);
    }
    res.status(201).send(saveUser);
  } catch (error) {
    res.status(500).json(error);
  }
});




export default users;


