import express from "express";

import Joi from "joi";
import {
  taskCreateSchema,
  taskQuerySchema,
  taskUpdateSchema,
} from "../schemas/taskSchemas.js";
import validate from "../middleware/validate.js";
import getClient from "../middleware/dbClient.js";

// App setup
export const app = express();

app.use(express.json());
app.use(getClient);

// API
app.get("/", async (req, res) => {
  try {
    const dbConnCheck = await req.db.query("SELECT NOW();");
    res.json({ API: "ONLINE", DBConnection: dbConnCheck.rows[0] });
  } catch (error) {
    res.status(500).json({ Error: error.message });
    return;
  }
});

app.get("/api/tasks", validate(taskQuerySchema, "query"), async (req, res) => {
  const { status } = req.validated.query;
  try {
    if (status === "All") {
      const result = await req.db.query("SELECT * FROM tasks");
      res.json(result.rows);
      return;
    }
    const result = await req.db.query("SELECT * FROM tasks WHERE status = $1", [
      status,
    ]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ Error: error.message });
    return;
  }
});

app.get(
  "/api/tasks/:id",
  validate(Joi.object({ id: Joi.number().integer() }), "params"),
  async (req, res) => {
    const { id } = req.validated.params;
    try {
      const result = await req.db.query(
        "SELECT * FROM tasks WHERE task_id = $1",
        [id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ Error: "task not found" });
        return;
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ Error: error.message });
      return;
    }
  }
);

app.post("/api/tasks", validate(taskCreateSchema, "body"), async (req, res) => {
  const { desc, status } = req.validated.body;
  try {
    const result = await req.db.query(
      `INSERT INTO tasks (description, status) 
      VALUES ($1, COALESCE($2, 'To do'::status))
      RETURNING *;`,
      [desc, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

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
