import express from "express";
import {
  commentImageById,
  getListCommentById,
} from "../controllers/commentControllers.js";
import { checkToken } from "../middleware/checkToken.js";
import { checkUserId } from "../middleware/checkUserId.js";

const commentRoutes = express.Router();

commentRoutes.get("/list-comment/:imageId", getListCommentById); // byImageID
commentRoutes.post("/comment-image/:imageId/:userId", checkToken, checkUserId, commentImageById);

export default commentRoutes;
