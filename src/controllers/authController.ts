import type { Request, Response } from "express";
import * as authService from "../services/authService.js";

interface RequestBody {
  email: string;
  password: string;
}

export const register = async (
  req: Request<{}, {}, RequestBody>,
  res: Response
) => {
  const { email, password } = req.body;
  const newUser = await authService.registerUser(email, password);
  res.status(201).json(newUser);
};

export const login = async (
  req: Request<{}, {}, RequestBody>,
  res: Response
) => {
  const { email, password } = req.body;
  const token = await authService.authenticateUser(email, password);
  res.status(200).json({ token: token });
};
