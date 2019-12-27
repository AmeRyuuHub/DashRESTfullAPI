import { usersModel } from "../models";
import express from 'express';
import { hash } from 'bcryptjs';



const users = express.Router();

users.get("/", async (req, res) => {

  try {
    const usersList = await usersModel.find();
    res.status(200).send(usersList);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`
    });
  }
});

users.get('/:id',  async (req,res) =>{
  try {
    const userId = req.params.id;
      const user = await usersModel.findOne({_id:userId},{password:0});
      if (!user) throw new Error("User not found")
      res.status(200).send({user:user})
    } 
   catch (err) {
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
    const checkUser = await usersModel.findOne({ login: req.body.login });
    if (!!checkUser) {
      throw new Error("This login already exist");
    }
   
    const checkEmail = await usersModel.findOne({ email: req.body.email });
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
    res.status(201).send({message:"User was added"});
  } catch (error) {
    res.status(500).json(error.message);
  }
});

users.patch("/:id", async(req, res) => {
  let userId = req.params.id;
  try {
    
      const updatedUser = await usersModel.updateOne(
        { _id: userId },
        { $set: {...req.body} }
      );
      updatedUser.nModified
        ? res.status(201).send({message: `User ${userId} was updated` })
        : res.status(204).send({message: "Nothing changed" }); 
    } 
   catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  } 
});

users.patch("/password/:id", async (req, res) => {
  let userId = req.params.id;
  try {
    let hashedPassword = await hash(req.body.password, 10);
    let updatedUser = await usersModel.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } }
    );
    updatedUser.nModified
      ? res.status(201).send({ message: `User ${userId} was updated` })
      : res.status(204).send({ message: "Nothing changed" });
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`
    });
  }
});

users.delete("/:id", async(req, res) => {
  
  try {
    const userId = req.params.id;
      await usersModel.deleteOne(
        { _id: userId } 
      );
      res.status(201).send({message:`User ${userId} was removed`})
    } 
   catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  } 
});

export default users;


