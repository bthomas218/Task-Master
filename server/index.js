import express from "express";
import Joi from "joi";
import Task from "./task.js";
import TaskList from "./tasklist.js";
import { config } from "dotenv";
import { Pool } from "pg";

//Load Enviroment Variables
config();

//Connect to database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// For testing
const tl = new TaskList();
tl.addTask(new Task(1, "Add POST method"));
tl.addTask(new Task(2, "Add PATCH method"));
tl.addTask(new Task(3, "Add DELETE method"));

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
  status: Joi.string().valid("All", "To do", "In progress", "complete"),
});

const validate = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property]);
  if (error) {
    res.status(422).json({ error: error.details.map((d) => d.message) });
    return;
  }
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
    res.status(500).json({ Error: `Error Executing Query: ${error.message}` });
    return;
  }
});

app.get("/api/tasks", validate(taskListSchema, "query"), async (req, res) => {
  const { status } = req.query;
  try {
    if (status == "All") {
      const result = await req.db.query("SELECT * FROM TASKS");
      res.json(result.rows);
      return;
    }
    const result = await req.db.query("SELECT * FROM tasks WHERE status = $1", [
      status,
    ]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ Error: `Error Executing Query: ${error.message}` });
    return;
  }
});

app.get("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const t = tl.getTask(parseInt(id));
  if (t) res.json(t.toJSON());
  else res.status(404).json({ error: "task not found" });
});

app.post("/api/tasks", (req, res) => {
  const { error } = validate(taskSchema, req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const { desc, status } = req.body;
  const t = new Task(tl.len() + 1, desc, status);
  tl.addTask(t);
  res.json(t.toJSON());
});

app.patch("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { error } = validate(taskUpdateSchema, req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const { desc, status } = req.body;
  const t = tl.getTask(parseInt(id));
  if (t) {
    tl.updateTask(parseInt(id), desc, status);
    res.json(t.toJSON());
  } else res.status(404).json({ error: "task not found" });
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const t = tl.getTask(parseInt(id));
  if (t) {
    tl.deleteTask(parseInt(id));
    res.json(t.toJSON());
  } else res.status(404).json({ error: "task not found" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
