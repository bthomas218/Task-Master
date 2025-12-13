# Task Master

A RESTful Task Management API built with Node.js, Express, and PostgreSQL.
Implements modern JavaScript syntax, clean architecture, and persistent storage through a real database.

---

## 🚀 Features

Full CRUD API: Add, list, update, and delete tasks

Task status tracking: to-do, in progress, completed

JWT Authentication

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
├── drizzle.config.ts
├── package-lock.json
├── package.json
├── README.md
├── src
│  ├── app.ts
│  ├── config.ts
│  ├── controllers
│  │  ├── authController.ts
│  │  └── taskController.ts
│  ├── db
│  │  ├── index.ts
│  │  ├── migrations
│  │  │  ├── 0000_dusty_bromley.sql
│  │  │  ├── 0001_awesome_lily_hollister.sql
│  │  │  └── meta
│  │  │     ├── 0000_snapshot.json
│  │  │     ├── 0001_snapshot.json
│  │  │     └── _journal.json
│  │  ├── queries
│  │  │  ├── tasks.ts
│  │  │  └── users.ts
│  │  └── schema.ts
│  ├── index.ts
│  ├── interfaces
│  │  └── user.interface.ts
│  ├── middleware
│  │  ├── authMiddleware.ts
│  │  ├── errorHandlingMiddleware.ts
│  │  └── validationMiddleware.ts
│  ├── routes
│  │  ├── authRouter.ts
│  │  └── taskRouter.ts
│  ├── schemas
│  │  ├── authSchemas.ts
│  │  └── taskSchemas.ts
│  ├── services
│  │  ├── authService.ts
│  │  └── taskService.ts
│  ├── types
│  │  └── express.d.ts
│  └── utils
│     ├── auth.ts
│     ├── errors.ts
│     └── typing.ts
└── tsconfig.json

```

---

## Installation

### Demo

_Live Link Coming soon!_

### Running on your machine

Installing files and dependencies

```bash
git clone https://github.com/bthomas218/Task-Master
cd Task-Master
npm i
```

Next you will need a .env file with the keys

- `JWT_SECRET`: your jwt secret
- `DATABASE_URL`: connection string to a postgres database

To set up the database

```bash
npm run migrate
```

To run the program

```bash
npm run build
npm run start
```

Now you can hit the endpoints with your favorite http client

## ▶️ Usage

### `/api/v1` Endpoints

#### `/tasks`

Each route is protected by JWT authentication. So you need the user's token in the request headers

- `GET /tasks` - List all tasks
  - Query Parameters:
  - `status` (optional) - Filter tasks by status:
    - `to do`, `in progress`, `complete`, if there's none it lists all tasks
- `GET /tasks/:id` - Get a specific task by ID
- `POST /tasks` - Create a new task
  - Request Body:
    - `desc` (string, required) - Description of the task
    - `status` (string, optional) - Status of the task ((Default)`to do`, `in progress`, `complete`)
- `PUT /tasks/:id` - Update the status or description of an existing task with the given ID
  - Request Body:
    - `desc` (string, optional) - New description of the task
    - `status` (string, optional) - New status of the task (`to do`, `in progress`, `complete`)
    - If neither is present, get an empty response
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
