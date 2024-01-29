import express from "express";
import { login, signUp } from "../controllers/authControllers.js";

const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.post("/sign-up", signUp);

export default authRoutes;
