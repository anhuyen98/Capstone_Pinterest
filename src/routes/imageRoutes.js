import express from "express";
import {
  createImage,
  deleteImage,
  getImageById,
  // getListByName,
  getListImage,
  saveImage,
} from "../controllers/imageControllers.js";
import { checkToken } from "../middleware/checkToken.js";
import { checkUserId } from "../middleware/checkUserId.js";
// import storage from "../controllers/uploadController.js"; -- save on local BE
import uploadCloud from "../configs/cloudinary.config.js";
import { uploadSingleFile } from "../middleware/uploadImageLocal.js";

const imageRoutes = express.Router();

imageRoutes.get("/list-image", getListImage); // GET ListImage & ListImageByName
// imageRoutes.get("/list-image-by-name", getListByName); // searchHandle
imageRoutes.get("/image-info-by-id/:imageId", getImageById); // image-info & user-create-image
imageRoutes.post(
  "/add-image-by-userID/:userId",
  checkToken,
  checkUserId,
  uploadCloud.single("file"),
  uploadSingleFile,
  createImage
); //
imageRoutes.get("/save-image-by-id/:imageId/:userId", checkToken, checkUserId, saveImage); // checkSave (Button Save)
imageRoutes.delete("/delete-create-by-id/:imageId", checkToken, deleteImage);

export default imageRoutes;
