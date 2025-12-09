import express from "express";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";
import { validateBody } from "../middleware/validationMiddleware.js";
import * as authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  authController.register
);

authRouter.post("/login", validateBody(loginSchema), authController.login);

export default authRouter;
