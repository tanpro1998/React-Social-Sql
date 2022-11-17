import express from "express";
import { addStory, deleteStory, getStories } from "../controllers/story.js";
const storyRouter = express.Router();

storyRouter.get("/", getStories);
storyRouter.post("/", addStory);
storyRouter.delete("/:id", deleteStory);

export default storyRouter;
