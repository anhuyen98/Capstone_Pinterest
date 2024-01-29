import express from "express";
import {
  getInfoUser,
  getListCreate,
  getListSave,
  updateUser,
} from "../controllers/userControllers.js";
import { checkToken } from "../middleware/checkToken.js";
import { checkUserId } from "../middleware/checkUserId.js";

const userRoutes = express.Router();

userRoutes.get("/user-info/:userId", checkToken, checkUserId, getInfoUser);
userRoutes.put("/update-user-info/:userId", checkToken, checkUserId, updateUser);
userRoutes.get("/list-save-image-by-userID/:userId", checkToken, checkUserId, getListSave);
userRoutes.get("/list-create-image-by-userID/:userId", checkToken, checkUserId, getListCreate);

export default userRoutes;
