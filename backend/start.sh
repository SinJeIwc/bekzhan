#!/bin/sh
set -e

# Render gives postgres:// but SQLAlchemy 2.x requires postgresql://
if echo "$DATABASE_URL" | grep -q '^postgres://'; then
  export DATABASE_URL="$(echo "$DATABASE_URL" | sed 's|^postgres://|postgresql://|')"
fi

echo "Waiting for database..."
attempts=0
max_attempts=30
until /app/.venv/bin/python -c "
from sqlalchemy import create_engine, text
engine = create_engine('$DATABASE_URL')
with engine.connect() as c:
    c.execute(text('SELECT 1'))
print('Database is ready')
" 2>&1; do
  attempts=$((attempts + 1))
  if [ "$attempts" -ge "$max_attempts" ]; then
    echo "ERROR: Could not connect to database after $max_attempts attempts"
    exit 1
  fi
  echo "Database not ready (attempt $attempts/$max_attempts), retrying in 2s..."
  sleep 2
done

echo "Running database migrations..."
/app/.venv/bin/alembic upgrade head

echo "Starting server..."
exec /app/.venv/bin/fastapi run --host 0.0.0.0 --port "${PORT:-8000}"
