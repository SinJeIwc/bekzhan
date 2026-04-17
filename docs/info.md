# Bekzhan Profile Site - Tech Stack & Libraries

## Frontend (existing)

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2 | React meta-framework (App Router, SSR/SSG) |
| **shadcn/ui** | latest | UI component collection (Radix + Tailwind) |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Motion** | latest | Animations and page transitions |
| **TypeScript** | 5.x | Type safety |

Data fetching: native `fetch` API.

## Backend (FastAPI)

| Technology | Version | Purpose |
|---|---|---|
| **FastAPI** | 0.135.3+ | Python web framework (REST API) |
| **Uvicorn** | latest | ASGI server (used by `fastapi` CLI) |
| **SQLModel** | 0.0.38+ | ORM + Pydantic validation in one model |
| **Alembic** | 1.18.4+ | Database migrations |
| **PostgreSQL** | 17 | Relational database (Docker, alpine image) |
| **Pydantic** | 2.x | Data validation (ships with FastAPI) |
| **PyJWT** | latest | JWT token generation & verification |
| **pwdlib[argon2]** | latest | Password hashing (Argon2 algorithm) |
| **python-multipart** | latest | File upload handling |
| **Pillow** | 12.2+ | Image processing (resize posters on upload) |
| **pydantic-settings** | latest | Settings from `.env` files |
| **psycopg2-binary** | latest | PostgreSQL driver |

## Dev Tools

| Tool | Purpose |
|---|---|
| **Python** | 3.13+ |
| **uv** | Package manager (replaces pip + virtualenv). Uses `pyproject.toml` |
| **pnpm** | Frontend package manager |
| **Docker Compose** | PostgreSQL container for local dev |
| **Ruff** | Python linter + formatter (with FastAPI rules enabled) |
| **basedpyright** | Type checker (Zed default, strict mode) |
| **FastAPI CLI** | `fastapi dev` / `fastapi run` for dev/prod server |

## Related Docs

- [architecture.md](./architecture.md) — ADR, system design, DB schema, project structure, best practices
- [routes.md](./routes.md) — frontend pages and backend API endpoints
- [docker.md](./docker.md) — Docker commands, startup order, troubleshooting
