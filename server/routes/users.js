import express from "express";
import { getUser, getUsers, updateUser } from "../controllers/user.js";

const userRouter = express.Router();
userRouter.get("/", getUsers);
userRouter.get("/find/:userId", getUser);
userRouter.put("/", updateUser);

export default userRouter;
