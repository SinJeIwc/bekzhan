from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.routers import dramas, owner, upload

app = FastAPI(
    title="Bekzhan's API",
    description="API for Bekzhan's project",
    version="1.0.0",
)

app.include_router(dramas.public_router, prefix="/api")
app.include_router(dramas.protected_router, prefix="/api")
app.include_router(owner.router, prefix="/api")
app.include_router(upload.router, prefix="/api")

uploads_path = Path(settings.upload_dir)
uploads_path.mkdir(exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_path), name="uploads")


@app.get("/health", tags=["Health"])
def health() -> dict[str, str]:
    return {"status": "ok"}
