from fastapi import FastAPI

from app.routers import dramas, owner

app = FastAPI(
    title="Bekzhan's API",
    description="API for Bekzhan's project",
    version="1.0.0",
)

app.include_router(dramas.public_router, prefix="/api")
app.include_router(dramas.protected_router, prefix="/api")
app.include_router(owner.router, prefix="/api")


@app.get("/health", tags=["Health"])
def health():
    return {"status": "ok"}
