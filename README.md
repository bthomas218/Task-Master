# Task Master

A RESTful Task Management API built with Node.js, Express, and PostgreSQL.
Implements modern JavaScript syntax, clean architecture, and persistent storage through a real database.

---

## 🚀 Features

Full CRUD API: Add, list, update, and delete tasks

Task status tracking: to-do, in progress, completed

PostgreSQL database persistence

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
├── package-lock.json
├── package.json
├── README.md
└── src
   ├── app.js
   ├── controllers
   │  ├── authController.js
   │  └── taskController.js
   ├── db
   │  └── pool.js
   ├── middleware
   │  ├── authMiddleware.js
   │  ├── dbClient.js
   │  ├── errorHandlingMiddleware.js
   │  └── validate.js
   ├── routes
   │  ├── authRoutes.js
   │  └── taskRoutes.js
   ├── schemas
   │  ├── authSchemas.js
   │  └── taskSchemas.js
   ├── server.js
   ├── services
   │  ├── authServices.js
   │  └── taskService.js
   └── utils
      └── errorHandler.js

```

---

## ▶️ Usage

_Live Link coming soon!_

### `/api` Endpoints

#### `/tasks`

- `GET /tasks` - List all tasks
  - Query Parameters:
  - `status` (optional) - Filter tasks by status:
    - `To do`, `In progress`, `complete`, (Default) `All`
- `GET /tasks/:id` - Get a specific task by ID
- `POST /tasks` - Create a new task
  - Request Body:
    - `desc` (string, required) - Description of the task
    - `status` (string, optional) - Status of the task ((Default)`To do`, `In progress`, `complete`)
- `PATCH /tasks/:id` - Update the status or description of an existing task with the given ID
  - Request Body:
    - `desc` (string, optional) - New description of the task
    - `status` (string, optional) - New status of the task (`To do`, `In progress`, `complete`)
- `DELETE /tasks/:id` - Delete a task with the given ID

#### `/auth`

- `POST /register`

  - Request body:
  - `email` (string, required) - Register user with this email
  - `password` (string, min_length: 8, required) - Register user with this password

- `POST /login`
  - Request body:
  - `email` (string, required) - Login as the user with this email
  - `password` (string, required) - Login as the user with this password

---

## 🚧 Roadmap

1. Refactor to TypeScript

   - Migrate JS codebase to full TypeScript

   - Add build pipeline

   - Introduce domain types

   - Add type-safe request/response interfaces.

2. Integrate ORM

   - ~~Add Drizzle ORM with PostgreSQL~~

   - ~~Define database schema in code~~

   - ~~Generate & run migrations~~

   - Replace raw SQL with type-safe queries

   - Implement repositories/services with Drizzle

3. Finish Authentication
   - Implement Authentication Middleware
   - Protect task routes
   - Make task controllers use authentication info
   - Make task services user specific
