import { usersModel } from "../models";
import express from 'express';
import { hash, } from 'bcryptjs';



const users = express.Router();

users.get('/',  async (req,res) =>{
  try {
    const userId = req.userId;
    
    if (userId) {
      const usersList = await usersModel.find();
      res.status(200).json(usersList)
    } 
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
    
   
})

users.post("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }
  try {
    const checkUser = await usersModel.find({ login: req.body.login });
    if (!!checkUser) {
      throw new Error("This login already exist");
    }
    const checkEmail = await usersModel.find({ email: req.body.email });
    if (!!checkEmail) {
      throw new Error("This email already exist");
    }
    let hashedPassword = await hash(req.body.password, 10);
    let model = new usersModel({
      login: req.body.login,
      fullName: req.body.fullName,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword
    });

    const saveUser = await model.save();
    if (!saveUser || saveUser.length === 0) {
      return res.status(500).send(saveUser);
    }
    res.status(201).send(saveUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

users.patch("/:id", async(req, res) => {
  let id = req.params.id;
  res.send({id:id});
});

users.delete("/:id", async(req, res) => {
  let id = req.params.id;
  res.send({id:id});
});

export default users;


