# Task Master

A RESTful Task Management API built with Node.js, Express, and PostgreSQL.
Implements modern JavaScript syntax, clean architecture, and persistent storage through a real database.

---

## 🚀 Features

Full CRUD API: Add, list, update, and delete tasks

Task status tracking: to-do, in progress, completed

PostgreSQL database persistence (no JSON files!)

Input validation and error handling

Modern ES2022+ syntax with async/await and modular design

---

## 🛠️ Tech Stack

- Node.js
- JavaScript (ES2022+)
- Expres.js v5
- PostgreSQL (Hosted on Neon)

---

## 📂 Project Structure

```text
.
├── README.md
└── server
   ├── index.js
   ├── package-lock.json
   └── package.json

```

---

## ▶️ Usage

_Live Link coming soon!_

### API Endpoints

- `GET /tasks` - List all tasks
  - Query Parameters:
  - `status` (optional) - Filter tasks by status:
    - `To do`, `In progress`, `complete`, (Default) `All`
- `GET /tasks/:id` - Get a specific task by ID
- `POST /tasks` - Create a new task
  - Request Body:
    - `description` (string, required) - Description of the task
    - `status` (string, optional) - Status of the task ((Default)`To do`, `In progress`, `complete`)
- `PATCH /tasks/:id` - Update the status or description of an existing task with the given ID
  - Request Body:
    - `description` (string, optional) - New description of the task
    - `status` (string, optional) - New status of the task (`To do`, `In progress`, `complete`)
- `DELETE /tasks/:id` - Delete a task with the given ID
