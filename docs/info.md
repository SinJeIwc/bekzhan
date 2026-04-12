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

## Backend (new — FastAPI)

| Technology | Version | Purpose |
|---|---|---|
| **FastAPI** | 0.135.3 | Async Python web framework (REST API) |
| **Uvicorn** | latest | ASGI server (used by `fastapi` CLI) |
| **SQLModel** | latest | ORM + Pydantic validation in one model (replaces SQLAlchemy + separate schemas) |
| **Alembic** | 1.18.4 | Database migrations |
| **PostgreSQL** | 16+ | Relational database |
| **Pydantic** | 2.x | Data validation (ships with FastAPI, used by SQLModel) |
| **PyJWT** | latest | JWT token generation & verification |
| **pwdlib[argon2]** | latest | Password hashing (Argon2 algorithm) |
| **python-multipart** | latest | File upload handling |
| **Pillow** | latest | Image processing (resize posters on upload) |

## Dev Tools

| Tool | Purpose |
|---|---|
| **Python** | 3.12+ |
| **uv** | Package manager (replaces pip + virtualenv). Uses `pyproject.toml` |
| **pnpm** | Frontend package manager |
| **Docker Compose** | PostgreSQL container for local dev |
| **Ruff** | Python linter + formatter (with FastAPI rules enabled) |
| **FastAPI CLI** | `fastapi dev` / `fastapi run` for dev/prod server |

## Related Docs

- [architecture.md](./architecture.md) — ADR, system design, DB schema, project structure, best practices
- [routes.md](./routes.md) — frontend pages and backend API endpoints
