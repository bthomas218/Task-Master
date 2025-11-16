import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

const router = express.Router();

//Router to handle user registration
router.post("/register", registerController);

//Router to handle user login
router.post("/login", loginController);

export default router;
