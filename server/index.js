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
  const t = tl.getTask(parseInt(id));
  if (t) res.json(t.toJSON());
  else res.status(404).json({ error: "task not found" });
});

app.post("/api/tasks", (req, res) => {
  try {
    const { desc } = req.body;
    const t = new Task(tl.len() + 1, desc);
    tl.addTask(t);
    res.json(t.toJSON());
  } catch (error) {
    res
      .status(400)
      .json({ "Error Name:": error.name, "Error:": error.message });
  }
});

app.patch("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { desc, status } = req.body;
  const t = tl.getTask(parseInt(id));
  if (t) {
    tl.updateTask(parseInt(id), desc, status);
    res.json(t.toJSON());
  } else res.status(404).json({ error: "task not found" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
