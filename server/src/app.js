import express from "express";
import { default as taskRoutes } from "../routes/taskRoutes.js";
import getClient from "../middleware/dbClient.js";
import validate from "../middleware/validate.js";
import { taskQuerySchema, taskUpdateSchema } from "../schemas/taskSchemas.js";
import Joi from "joi";

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

export default app;

// Old API Endpoints to be refactored

// TODO: Split this endpoint into routes, controllers, services
app.patch(
  "/api/tasks/:id",
  validate(Joi.object({ id: Joi.number().integer() }), "params"),
  validate(taskUpdateSchema, "body"),
  async (req, res) => {
    const { id } = req.validated.params;
    const { desc, status } = req.validated.body;

    if (!desc && !status) {
      res.status(204);
    }

    try {
      const result = await req.db.query(
        `UPDATE tasks 
        SET description = COALESCE($1, description), 
        status = COALESCE($2, status),
        updated_at = NOW() 
        WHERE task_id = $3
        RETURNING description, status, updated_at;`,
        [desc, status, id]
      );

      if (result.rows.length === 0) {
        res.status(404).json({ Error: "Task not found" });
        return;
      }

      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);

// TODO: Split this endpoint into routes, controllers, services
app.delete(
  "/api/tasks/:id",
  validate(Joi.object({ id: Joi.number().integer() }), "params"),
  async (req, res) => {
    const { id } = req.validated.params;

    try {
      const result = await req.db.query(
        `DELETE FROM tasks 
        WHERE task_id = $1
        RETURNING *;`,
        [id]
      );

      if (result.rows.length === 0) {
        res.status(404).json({ Error: "Task not found" });
        return;
      }

      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
);
