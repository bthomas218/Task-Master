import * as AuthService from "../services/authServices.js";

// Controller to handle user registration
export const register = async (req, res) => {
  const { email, password } = req.validated.body;
  await AuthService.registerUser(req.db, email, password);
  res.status(201).json({ message: "User registered successfully" });
};

//TODO: implement login controller
// Controller to handle user login
export const login = async (req, res) => {
  // Login logic here
};
