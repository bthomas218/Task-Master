# Task Master

A RESTful Task Management API built with NestJS, the Fastify adapter, Prisma, and PostgreSQL.

## Features

- JWT authentication
- Task CRUD with per-user ownership
- Task status filtering
- Prisma migrations
- Local PostgreSQL development database through Docker Compose

## Tech Stack

- Node.js
- TypeScript
- NestJS with Fastify
- Prisma ORM
- PostgreSQL
- pnpm

## Running Locally

Install dependencies:

```bash
pnpm install
```

Create local environment values:

```bash
cp .env.example .env
```

Start the local database:

```bash
docker compose up -d
```

Run Prisma migrations:

```bash
pnpm prisma:migrate
```

This project uses Prisma 7's `prisma.config.ts`; keep the connection URL in `.env`, not in `prisma/schema.prisma`.

Start the API in watch mode:

```bash
pnpm dev
```

For production-style startup:

```bash
pnpm build
pnpm start
```

## Environment

- `DATABASE_URL`: PostgreSQL connection string.
- `JWT_SECRET`: secret used to sign JWTs.
- `HOST`: bind host, defaults to `localhost`.
- `PORT`: bind port, defaults to `3000`.

## API

All routes are prefixed with `/api/v1`.

### Auth

- `POST /auth/register`
  - Body: `{ "email": "user@example.com", "password": "password123" }`
- `POST /auth/login`
  - Body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "token": "..." }`

### Tasks

Task routes require an `Authorization: Bearer <token>` header.

- `GET /tasks`
  - Optional query: `status=all|todo|in_progress|complete`
- `GET /tasks/:id`
- `POST /tasks`
  - Body: `{ "description": "Write tests", "status": "todo" }`
- `PUT /tasks/:id`
  - Body: `{ "description": "Ship migration", "status": "complete" }`
- `DELETE /tasks/:id`

Task statuses are `todo`, `in_progress`, and `complete`.
