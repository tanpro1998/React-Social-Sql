import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
} from "../controllers/comment.js";

const commentRouter = express.Router();

commentRouter.get("/", getComments);
commentRouter.post("/", addComment);
commentRouter.delete("/:id", deleteComment);

export default commentRouter;
