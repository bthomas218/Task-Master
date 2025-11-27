import * as AuthService from "../services/authServices.js";

// Controller to handle user registration
export const register = async (req, res) => {
  const { email, password } = req.validated.body;
  await AuthService.registerUser(req.db, email, password);
  res.status(201).json({ message: "User registered successfully" });
};

// Controller to handle user login
export const login = async (req, res) => {
  const { email, password } = req.validated.body;
  const token = await AuthService.loginUser(req.db, email, password); // Token not implemented yet
  res.status(201).json({ message: "Login successfull", token: token });
};
