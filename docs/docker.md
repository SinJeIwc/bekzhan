# Docker

PostgreSQL runs via Docker Compose. File: `backend/docker-compose.yml`.

## When to start

Docker with PostgreSQL is required **whenever** you work with the backend. Without it, FastAPI cannot connect to the database and will fail on the first DB request.

Startup order:
1. Docker (PostgreSQL) → 2. Alembic (migrations) → 3. FastAPI (server)

## Commands

Start the container (detached):
```bash
cd backend
docker compose up -d
```

Check that the container is running and the DB is ready:
```bash
docker compose ps
```
Status should be `Up (healthy)`. If `starting` — wait a few seconds for the healthcheck.

Stop the container (data is preserved):
```bash
docker compose down
```

Stop and delete all data (full DB reset):
```bash
docker compose down -v
```
The `-v` flag removes the `pgdata` volume — the entire DB will be wiped. After this, restart the container and re-run migrations.

View PostgreSQL logs:
```bash
docker compose logs db
```

Connect to the DB via psql:
```bash
docker exec -it bekzhan-pg psql -U postgres -d bekzhan
```

## Full startup cycle (from scratch)

```bash
cd backend
docker compose up -d          # 1. start PostgreSQL
uv run alembic upgrade head   # 2. run migrations
uv run fastapi dev            # 3. start the server
```

## When to restart

- Changed `docker-compose.yml` (port, image, env vars) → `docker compose down && docker compose up -d`
- PostgreSQL crashed or container is down → `docker compose restart db`
- Want a clean DB → `docker compose down -v && docker compose up -d && uv run alembic upgrade head`
- Changed only Python code → Docker restart is **not needed**, only FastAPI

## Common issue: port 5432 in use

If you see `address already in use` — a local PostgreSQL instance is occupying the port:
```bash
lsof -i :5432                       # find what's holding the port
brew services stop postgresql@14    # stop local PG (macOS)
docker compose up -d                # now Docker can use the port
```
