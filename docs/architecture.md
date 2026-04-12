# Architecture

## ADR-001: Backend Stack Decisions

**Status:** Accepted
**Date:** 2026-04-13

### Context

Building a lightweight backend for a personal profile site. Single admin user, CRUD for dramas/media, image uploads. Need to choose ORM, package manager, and async strategy.

### Decisions

| Decision | Choice | Rationale |
|---|---|---|
| ORM | **SQLModel** | Recommended by FastAPI skill. One model = ORM + Pydantic validation. Less boilerplate than SQLAlchemy + separate schemas. |
| Package manager | **uv + pyproject.toml** | Fast, modern. Replaces pip + virtualenv + requirements.txt. Single `pyproject.toml` for deps and config. |
| Async strategy | **Sync `def` endpoints** | SQLModel uses blocking SQLAlchemy under the hood. Use regular `def` — FastAPI runs them in a threadpool automatically. Never put blocking code in `async def`. |
| Linter/formatter | **Ruff** | Replaces Black + isort + flake8. Enable FastAPI rules. |
| Type checker | **ty** (if available) | Recommended by FastAPI skill. |
| HTTP client | **HTTPX** (if needed) | Recommended over Requests. Supports sync and async. |

### Consequences

- No separate `schemas/` directory needed — SQLModel models handle both DB and validation
- `pyproject.toml` replaces `requirements.txt` and `alembic.ini` config
- All path operations use `def` (not `async def`) since DB calls are blocking
- Alembic still needed for migrations (SQLModel doesn't replace it)

---

## Overview

```
[Browser - Next.js 16 App]
    |
    |-- shadcn/ui + Tailwind (UI)
    |-- Motion (animations)
    |
    |--- fetch (native) ---> [FastAPI Server]
                                |
                                |-- SQLModel --> [PostgreSQL]
                                |-- Static files (/uploads/) for posters
                                |-- PyJWT (auth)
                                |-- Pillow (image resize)
```

Frontend and backend run as separate services:

- Dev: Next.js on port 3000, FastAPI on port 8000
- Production: reverse proxy (Nginx/Caddy) or deploy separately
- CORS middleware configured to allow requests from the Next.js frontend origin

## Authentication

**Approach:** Minimal single-user auth. No registration flow.

- On first startup, the app generates a random admin password via `secrets.token_urlsafe(16)` and stores it in `.env`. If `.env` already has a password, it reuses that.
- Login via `POST /api/auth/login` with hardcoded username + generated password
- Returns a JWT token (short-lived, 24h TTL)
- All write endpoints require `Authorization: Bearer <token>` header
- Public read endpoints are open (no token needed)
- Auth dependency uses `Annotated` style with reusable type alias:

```python
from typing import Annotated
from fastapi import Depends

CurrentAdminDep = Annotated[dict, Depends(get_current_admin)]
```

## File Storage

**Approach:** Local filesystem.

- Uploaded images stored in `/uploads/posters/` on the server
- FastAPI serves them as static files via `StaticFiles` mount
- On upload: validate file type (JPEG/PNG/WebP), resize to max 800px width via Pillow, generate unique filename
- Database stores relative path (`/uploads/posters/{filename}`)

## Database Schema (SQLModel)

```python
# Single model serves as both DB table and Pydantic schema

class DramaBase(SQLModel):
    title: str
    original_title: str | None = None
    poster_path: str | None = None
    description: str
    review: str
    rating: float = Field(ge=1, le=10)
    status: DramaStatus  # enum: watching, completed, dropped, plan_to_watch
    genres: list[str] = Field(default_factory=list)
    year: int
    episodes: int | None = None
    country: str | None = None

class Drama(DramaBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class DramaCreate(DramaBase):
    pass  # input schema — no id, no timestamps

class DramaPublic(DramaBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    # response schema — includes id and timestamps but no secrets
```

## Project Structure (backend)

```
backend/
├── app/
│   ├── main.py              — FastAPI app, CORS, static mount, lifespan
│   ├── config.py            — settings via pydantic-settings (DB URL, JWT secret, upload path)
│   ├── database.py          — SQLModel engine & Session dependency (yield)
│   ├── models/
│   │   ├── user.py          — User table + schemas
│   │   └── drama.py         — Drama table + DramaCreate, DramaPublic schemas
│   ├── routers/
│   │   ├── auth.py          — APIRouter(prefix="/api/auth", tags=["auth"])
│   │   ├── dramas.py        — APIRouter(prefix="/api/dramas", tags=["dramas"])
│   │   └── upload.py        — APIRouter(prefix="/api/upload", tags=["upload"])
│   ├── dependencies/
│   │   └── auth.py          — JWT verify dependency, CurrentAdminDep type alias
│   └── utils/
│       ├── password.py      — generate startup password, Argon2 hashing
│       └── image.py         — resize & save poster via Pillow
├── alembic/                 — migrations
├── uploads/                 — poster images (gitignored)
├── pyproject.toml           — deps, FastAPI entrypoint, Ruff config, Alembic config
├── uv.lock                  — lockfile (auto-generated by uv)
└── .env                     — secrets (DB URL, JWT secret, admin password)
```

### Key differences from SQLAlchemy approach

- No `schemas/` directory — SQLModel models handle validation
- `pyproject.toml` replaces `requirements.txt`
- `uv.lock` instead of pinned requirements
- Router config (prefix, tags) lives on the router, not in `include_router()`

## FastAPI Best Practices (from official skill)

1. **Annotated everywhere** — all params, dependencies, Query/Path use `Annotated`
2. **Type aliases for deps** — `DBSessionDep = Annotated[Session, Depends(get_session)]`
3. **Return types on all endpoints** — enables validation, filtering, serialization
4. **One HTTP method per function** — no `api_route()` with multiple methods
5. **No Ellipsis (`...`)** — don't use `...` as default value in params or Pydantic fields
6. **No ORJSONResponse/UJSONResponse** — deprecated, Pydantic handles serialization in Rust
7. **Router-level config** — `APIRouter(prefix="/api/dramas", tags=["dramas"])`, not in `include_router()`
8. **DB session via yield dependency** — cleanup after request:

```python
def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]
```

## Notes

- PostgreSQL runs locally via Docker: `docker run -d -p 5432:5432 -e POSTGRES_DB=bekzhan -e POSTGRES_PASSWORD=dev postgres:16`
- Pillow resizes posters on upload to keep file sizes small. Original aspect ratio preserved, max width 800px.
- FastAPI CLI reads entrypoint from `pyproject.toml`: `[tool.fastapi] entrypoint = "app.main:app"`
- Dev server: `fastapi dev`, production: `fastapi run`
