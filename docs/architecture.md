# Architecture

## ADR-001: Backend Stack Decisions

**Status:** Accepted
**Date:** 2026-04-13

### Context

Building a lightweight backend for a personal profile site. Single owner user, CRUD for dramas/media, image uploads. Need to choose ORM, package manager, and async strategy.

### Decisions

| Decision | Choice | Rationale |
|---|---|---|
| ORM | **SQLModel** | Recommended by FastAPI skill. One model = ORM + Pydantic validation. Less boilerplate than SQLAlchemy + separate schemas. |
| Package manager | **uv + pyproject.toml** | Fast, modern. Replaces pip + virtualenv + requirements.txt. Single `pyproject.toml` for deps and config. |
| Async strategy | **Sync `def` endpoints** | SQLModel uses blocking SQLAlchemy under the hood. Use regular `def` — FastAPI runs them in a threadpool automatically. Never put blocking code in `async def`. |
| Linter/formatter | **Ruff** | Replaces Black + isort + flake8. Enable FastAPI rules. |
| Type checker | **basedpyright** | Zed's default Python language server. Strict mode. |
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

- Owner password is hashed with Argon2 (via `pwdlib`) and stored in `.env` as `OWNER_PASSWORD_HASH`
- Login via `POST /api/owner/login` with username + password (OAuth2 form)
- Returns a JWT token (short-lived, 24h TTL)
- Write endpoints (create, update, delete) require `Authorization: Bearer <token>` header
- Read endpoints (list, get) are public — no token needed
- Auth dependency uses `Annotated` style with reusable type alias:

```python
from typing import Annotated
from fastapi import Depends

CurrentOwnerDep = Annotated[str, Depends(get_current_owner)]
```

## File Storage

**Approach:** Local filesystem.

- Uploaded images stored in `/uploads/posters/` on the server
- FastAPI serves them as static files via `StaticFiles` mount
- On upload: validate file type (JPEG/PNG/WebP) and verify image integrity, resize to max 800px width via Pillow, generate UUID-based filename
- Database stores relative path (`/uploads/posters/{filename}`)

## Database Schema (SQLModel)

```python
class DramaBase(SQLModel):
    title: str
    original_title: str | None = None
    poster_path: str | None = None
    description: str
    review: str | None = None
    rating: float = Field(ge=0, le=10)
    status: DramaStatus       # enum: watching, completed, dropped, planned
    genres: list[DramaGenre] = Field(default_factory=list, sa_column=Column(JSON))
    year: int
    episodes_aired: int | None = None
    episodes_total: int | None = None
    country: DramaCountry     # enum: Korea, China, Japan, Taiwan

class Drama(DramaBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime      # DateTime(timezone=True), auto-set
    updated_at: datetime      # DateTime(timezone=True), auto-set, onupdate

class DramaCreate(DramaBase):
    pass  # input schema — no id, no timestamps

class DramaPublic(DramaBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    # response schema — includes id and timestamps
```

## Project Structure (backend)

```
backend/
├── app/
│   ├── main.py              — FastAPI app, static mount, router wiring
│   ├── config.py            — settings via pydantic-settings (from .env)
│   ├── database.py          — SQLModel engine & session dependency (yield)
│   ├── models/
│   │   └── drama.py         — Drama table + enums + DramaCreate, DramaPublic
│   ├── routers/
│   │   ├── dramas.py        — public_router + protected_router (CRUD)
│   │   ├── owner.py         — APIRouter(prefix="/owner") — login endpoint
│   │   └── upload.py        — APIRouter(prefix="/upload") — poster upload
│   ├── dependencies/
│   │   ├── session.py       — SessionDep type alias
│   │   └── owner.py         — JWT verify, CurrentOwnerDep type alias
│   └── utils/
│       ├── password.py      — Argon2 hashing via pwdlib
│       ├── token.py         — JWT create & decode via PyJWT
│       └── image.py         — validate, resize & save poster via Pillow
├── alembic/                 — migrations (committed to git)
├── uploads/                 — poster images (gitignored)
├── pyproject.toml           — deps, FastAPI entrypoint, Ruff config
├── docker-compose.yml       — PostgreSQL 17-alpine
├── uv.lock                  — lockfile (committed to git)
└── .env                     — secrets (DB URL, JWT secret, owner password hash)
```

### Key differences from SQLAlchemy approach

- No `schemas/` directory — SQLModel models handle validation
- `pyproject.toml` replaces `requirements.txt`
- `uv.lock` instead of pinned requirements
- Router config (prefix, tags) lives on the router, not in `include_router()`

## FastAPI Best Practices (from official skill)

1. **Annotated everywhere** — all params, dependencies, Query/Path use `Annotated`
2. **Type aliases for deps** — `SessionDep = Annotated[Session, Depends(get_session)]`
3. **Return types on all endpoints** — enables validation, filtering, serialization
4. **response_model + accurate return type** — `response_model=DramaPublic` for serialization, `-> Drama` for type checker
5. **One HTTP method per function** — no `api_route()` with multiple methods
6. **No Ellipsis (`...`)** — don't use `...` as default value in params or Pydantic fields
7. **No ORJSONResponse/UJSONResponse** — deprecated, Pydantic handles serialization in Rust
8. **Router-level config** — `APIRouter(prefix="/dramas", tags=["dramas"])`, not in `include_router()`
9. **DB session via yield dependency** — cleanup after request

## Notes

- PostgreSQL runs locally via Docker. See [docker.md](docker.md) for commands and troubleshooting.
- Pillow resizes posters on upload to keep file sizes small. Original aspect ratio preserved, max width 800px.
- FastAPI CLI reads entrypoint from `pyproject.toml`: `[tool.fastapi] entrypoint = "app.main:app"`
- Dev server: `uv run fastapi dev`, production: `uv run fastapi run`
