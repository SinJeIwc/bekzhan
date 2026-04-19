#!/bin/sh
set -e

# Render gives postgres:// but SQLAlchemy 2.x requires postgresql://
if echo "$DATABASE_URL" | grep -q '^postgres://'; then
  export DATABASE_URL="$(echo "$DATABASE_URL" | sed 's|^postgres://|postgresql://|')"
fi

echo "Running database migrations..."
/app/.venv/bin/alembic upgrade head

echo "Starting server..."
exec /app/.venv/bin/fastapi run --host 0.0.0.0 --port "${PORT:-8000}"
