import { usersModel } from "../../models";
import { hash } from 'bcryptjs';


export const getProfile =  async (req,res) =>{
  try {
    const userId = req.userId;
      const user = await usersModel.findOne({_id:userId},{password:0});
      if (!user) throw new Error("User not found")
      res.status(200).send({user})
    } 
   catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }   
   
};

export const updateProfile =  async(req, res) => {
  let userId = req.userId;
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
};

export const changeProfilePassword = async (req, res) => {
  let userId = req.userId;
  
  try {
    const user = await usersModel.findOne({ _id: userId });
    if (!user) throw new Error("User not found");
    const valid = await compare(password, user.password);
    if (!valid) throw new Error("Old password incorrect");
    let hashedPassword = await hash(req.body.newPassword, 10);
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
};

export const deleteProfile = async(req, res) => {
  
  try {
    const userId = req.userId;
    const user = await usersModel.findOne({ _id: userId });
    if (!user) throw new Error("User not found");
    const valid = await compare(password, user.password);
    if (!valid) throw new Error("Password incorrect");
      await usersModel.deleteOne(
        { _id: userId } 
      );
      await sessionModel.update(
        { user_id: session.user_id },
        { $set: { active: false, closeDate: new Date(), token: null } }
      );
      res.clearCookie("ssid", { path: "/auth" }); 
      res.status(201).send({message:`User ${userId} was removed`})
    } 
   catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  } 
};



