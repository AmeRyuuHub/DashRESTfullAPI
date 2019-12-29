
import express from "express";
import { getAllUsers, getOneUser, addUser, updateOneUser, changeUserPassword, deleteOneUser } from "../controllers";

const users = express.Router();

users.get("/", getAllUsers);
users.get("/:id", getOneUser);
users.post("/", addUser);
users.patch("/:id", updateOneUser);
users.patch("/password/:id", changeUserPassword);
users.delete("/:id", deleteOneUser);

export default users;
