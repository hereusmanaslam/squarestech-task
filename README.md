# SquaresTech — Team Directory & Task Board (CRUD)

Monorepo implementation of the SquaresTech take-home task:

- **Frontend**: Next.js (App Router) + TypeScript + TanStack Query
- **Backend**: NestJS + TypeORM + TypeScript
- **DB**: TypeORM `sqljs` driver (single local SQLite-like file, no native builds)

## Why this stack

- **Next.js**: fast UI iteration, App Router, good code-splitting/lazy-loading primitives.
- **NestJS**: modular architecture, strong validation story, consistent API structure.
- **TypeORM + sqljs**: persistent local DB file without needing native `sqlite3` builds.
- **TanStack Query**: keeps UI state in sync with the backend after create/update/delete via cache invalidation.

## Prerequisites

- Node.js \(recommended: latest LTS\)
- pnpm \(repo uses a pnpm workspace\)

## Setup

From repo root:

```bash
pnpm install
```

### Environment variables

- Backend: copy `apps/backend/.env.example` to `apps/backend/.env`
- Frontend: copy `apps/frontend/.env.example` to `apps/frontend/.env.local`

## Run locally

### Backend \(NestJS API\)

```bash
pnpm --filter backend dev
```

- API base: `http://localhost:3001/api`
- Swagger: `http://localhost:3001/docs`

### Frontend \(Next.js\)

```bash
pnpm --filter frontend dev
```

- App: `http://localhost:3000`

## API Endpoints

With global prefix `api` enabled, the endpoints are:

### Members

- `GET /api/members`
- `POST /api/members`
- `PATCH /api/members/:id`
- `DELETE /api/members/:id`

### Tasks

- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Architecture notes

- **Backend modules**: `src/members/*` contains the module/controller/service/entity + DTOs.
- **Task board module**: `src/tasks/*` contains the module/controller/service/entity + DTOs.
- **Validation**: Nest global `ValidationPipe` with `whitelist` + `forbidNonWhitelisted`.
- **Frontend state sync**: TanStack Query invalidates the `members` and `tasks` queries after mutations.
- **Lazy loading**: the edit member modal and task modal are dynamically imported (code-split) and only loaded when needed.

## Trade-offs / shortcuts (24h deadline)

- Kept the task board simple: a clear 3-column flow (`todo` → `in_progress` → `done`) without drag-and-drop.
- UI is intentionally minimal but polished; no heavy component library.
- DB uses TypeORM `synchronize: true` for speed (fine for a take-home, not for production).
