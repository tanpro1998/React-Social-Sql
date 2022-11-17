import express from "express";
import {
  addRelationship,
  deleteRelationship,
  getRelationships,
} from "../controllers/relationship.js";
const relationshipRouter = express.Router();

relationshipRouter.get("/", getRelationships);
relationshipRouter.post("/", addRelationship);
relationshipRouter.delete("/", deleteRelationship);

export default relationshipRouter;
