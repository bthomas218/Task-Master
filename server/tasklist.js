import fs from "fs";
import Task from "./task.js";
import { json } from "stream/consumers";

/**
 * A class to represent a list of tasks
 * @tasks: the tasks stored on the list
 */
export default class TaskList {
  //  Private Field
  #tasks;

  //  Public Field
  constructor() {
    this.#tasks = [];
  }

  //  Add a task
  addTask(task) {
    this.#tasks.push(task);
  }

  // Update a task
  updateTask(id, desc = null, status = null) {
    const task = this.#tasks.find((task) => task.id === id);
    if (desc !== null) task.desc = desc;
    if (status !== null) task.status = status;
  }

  // Delete a task
  deleteTask(id) {
    this.#tasks = this.#tasks.filter((t) => t.id !== id);
  }

  // List all tasks or list all tasks with a certain status
  listTasks(status = "All") {
    if (status === "All") return this.#tasks.map((t) => t.toJSON());
    return this.#tasks.filter((task) => task.status === status);
  }

  getTask(id) {
    return this.#tasks.find((task) => task.id === id);
  }

  static loadFromFile(fileName) {
    if (!fs.existsSync(fileName)) return new TaskList();

    const raw = fs.readFileSync(fileName, "utf8");
    const data = JSON.parse(raw);
    const taskList = new TaskList();
    data.forEach((t) => {
      taskList.addTask(
        new Task(t.id, t.desc, t.status, t.createdAt),
        t.updatedAt
      );
    });
    return taskList;
  }

  saveToFile(fileName) {
    const data = this.#tasks.map((t) => ({
      id: t.id,
      desc: t.desc,
      status: t.status,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    }));
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
  }

  len() {
    return this.#tasks.length;
  }
}
