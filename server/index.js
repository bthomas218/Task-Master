import express from "express";
import Joi from "joi";
import { config } from "dotenv";
import { Pool } from "pg";

//Load Enviroment Variables
config();

//Connect to database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//Schemas
const taskSchema = Joi.object({
  desc: Joi.string().required(),
  status: Joi.string().valid("To do", "In progress", "complete"),
});

const taskUpdateSchema = Joi.object({
  desc: Joi.string(),
  status: Joi.string().valid("To do", "In progress", "complete"),
});

const taskListSchema = Joi.object({
  status: Joi.string()
    .valid("All", "To do", "In progress", "complete")
    .default("All"),
});

const validate = (schema, property) => (req, res, next) => {
  if (!req.validated) {
    req.validated = {};
  }
  const { error, value } = schema.validate(req[property]);
  if (error) {
    res.status(422).json({ error: error.details.map((d) => d.message) });
    return;
  }
  req.validated[property] = value;
  next();
};

// App setup
const PORT = process.env.port || 3000;
const app = express();

const getClient = async (req, res, next) => {
  try {
    const client = await pool.connect();
    req.db = client;

    res.on("finish", () => client.release());

    next();
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    res.status(500).json({ Error: `Database connection error` });
  }
};

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

app.get("/api/tasks", validate(taskListSchema, "query"), async (req, res) => {
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

app.post("/api/tasks", validate(taskSchema, "body"), async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
