import { usersModel } from "../models/users.model";
import express from 'express';
import { hash, compare } from 'bcryptjs';

const users = express.Router();

users.get('/', async (req,res) =>{
    try {
        const usersList = await usersModel.find();
        res.status(200).json(usersList)
    } catch (error) {
        res.status(500).json(error); 
    }
   
})

users.post("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }
  try {
  const checkUser = await usersModel.find({email:req.body.email , name:req.body.login});
  console.log(checkUser);
 if (!!checkUser) { throw new Error("User already exist"); console.log("addError");}

let hashedPassword = await hash(req.body.password, 10)
  let model = new usersModel({
      login:req.body.login,
      fullName: req.body.fullName,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,});

    const saveUser = await model.save();
    if (!saveUser || saveUser.length === 0) {
      return res.status(500).send(saveUser);
    }
    res.status(201).send(saveUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


users.patch('/',(req,res) =>{
    res.send("You have requested a person")
})

export default users;


