import express, { Router } from "express";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";
import { validateBody } from "../middleware/validationMiddleware.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  async (req, res, next) => {
    const { email, password } = req.body;
    res.json({
      message: "User registered successfully",
      email: email,
      password: password,
    }); //TODO: Implement registration logic
  }
);

authRouter.post("/login", validateBody(loginSchema), async (req, res, next) => {
  const { email, password } = req.body;
  res.json({
    message: "User logged in successfully",
    email: email,
    password: password,
  }); //TODO: Implement login logic
});

export default authRouter;
