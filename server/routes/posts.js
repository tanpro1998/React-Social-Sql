import express from "express";
import { addPost, getPosts, deletePost } from "../controllers/post.js";

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.post("/", addPost);
postRouter.delete("/:id", deletePost);

export default postRouter;
