#!/bin/sh
set -e

echo "Running database migrations..."
/app/.venv/bin/alembic upgrade head

echo "Starting server..."
exec /app/.venv/bin/fastapi run --host 0.0.0.0 --port "${PORT:-8000}"
