import express from "express";
import * as AuthController from "../controllers/authController.js";
import { registerSchema } from "../schemas/authSchemas.js";
import validate from "../middleware/validate.js";

const router = express.Router();

//Router to handle user registration
router.post(
  "/register",
  validate(registerSchema, "body"),
  AuthController.register
);

//Router to handle user login
router.post("/login", AuthController.login);

export default router;
