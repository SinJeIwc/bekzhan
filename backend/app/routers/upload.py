from fastapi import APIRouter, HTTPException, UploadFile, status

from app.dependencies.owner import CurrentOwnerDep
from app.utils.image import save_poster

router = APIRouter(prefix="/upload", tags=["upload"])

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}


@router.post("/poster")
def upload_poster(
    file: UploadFile,
    _owner: CurrentOwnerDep,
) -> dict[str, str]:
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type: {file.content_type}",
        )
    filename = file.filename or "unknown.jpg"
    try:
        path = save_poster(file.file.read(), filename)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    return {"poster_path": path}
