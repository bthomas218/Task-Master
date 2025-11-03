import express, { json } from "express";
import Task from "./task.js";
import TaskList from "./tasklist.js";

const PORT = process.env.port || 3000;
const app = express();

// For testing
const tl = new TaskList();
tl.addTask(new Task(1, "Add POST method"));
tl.addTask(new Task(2, "Add PATCH method"));
tl.addTask(new Task(3, "Add DELETE method"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ONLINE");
});

app.get("/api/tasks", (req, res) => {
  const { status } = req.query;
  console.log(status);
  res.json(tl.listTasks(status));
});

app.get("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const t = tl.getTask(parseInt(id));
  console.log(t);
  if (t) res.json(t.toJSON());
  else res.status(404).json({ error: "task not found" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
