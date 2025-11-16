import express from "express";
import { default as taskRoutes } from "../routes/taskRoutes.js";
import getClient from "../middleware/dbClient.js";
import errorHandlingMiddleware from "../middleware/errorHandlingMiddleware.js";

const app = express();

app.use(express.json());
app.use(getClient);

// Health Route
app.get("/", async (req, res) => {
  const dbConnCheck = await req.db.query("SELECT NOW();");
  res.json({ status: "API ONLINE", dbTime: dbConnCheck.rows[0] });
});

// API Routes
app.use("/api", taskRoutes);

// This must be last
app.use(errorHandlingMiddleware);
export default app;
