# Stage 1: build dependencies

FROM python:3.13-slim AS builder

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

# Stage 2: production

FROM python:3.13-slim AS production

RUN addgroup --gid 1001 --system app && \
    adduser --system --uid 1001 --igroup app app

WORKDIR /app

COPY --from=builder --chown=app:app /app /app/

USER app

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1

CMD ["/app/.venv/bin/fastapi", "run", "--host", "0.0.0.0", "--port", "8000"]
