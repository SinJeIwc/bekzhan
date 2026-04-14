from fastapi import FastAPI

app = FastAPI(
    title="Bekzhan's API", description="API for Bekzhan's project", version="1.0.0"
)


@app.get("/health", tags=["Health"])
def health():
    return {"status": "ok"}
