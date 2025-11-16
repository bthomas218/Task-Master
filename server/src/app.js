import express from "express";
import { default as taskRoutes } from "../routes/taskRoutes.js";
import { default as authRoutes } from "../routes/authRoutes.js";
import getClient from "../middleware/dbClient.js";
import errorHandlingMiddleware from "../middleware/errorHandlingMiddleware.js";
import { NotFoundError } from "../utils/errorHandler.js";

const app = express();

app.use(express.json());
app.use(getClient);

// Health Route
app.get("/", async (req, res) => {
  const dbConnCheck = await req.db.query("SELECT NOW();");
  res.json({ status: "API ONLINE", dbTime: dbConnCheck.rows[0] });
});

// API Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Invalid Routes
app.use((req, res, next) => {
  throw new NotFoundError("Route not found");
});

// This must be last
app.use(errorHandlingMiddleware);
export default app;
