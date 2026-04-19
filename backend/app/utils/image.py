import uuid
from io import BytesIO
from pathlib import Path

from PIL import Image

from app.config import settings

POSTERS_DIR = Path(settings.upload_dir) / "posters"
MAX_WIDTH = 800


def delete_poster(poster_path: str) -> None:
    """Delete a poster file from the filesystem.

    Args:
        poster_path: The path stored in the database, e.g. "/uploads/posters/abc.jpg".

    Raises:
        FileNotFoundError: If the file does not exist.
        OSError: If the file cannot be deleted.
    """
    # poster_path is "/uploads/posters/{filename}", strip leading "/uploads/"
    relative = poster_path.lstrip("/").removeprefix("uploads/")
    filepath = Path(settings.upload_dir) / relative
    filepath.unlink()


def save_poster(file_bytes: bytes, original_filename: str) -> str:
    POSTERS_DIR.mkdir(parents=True, exist_ok=True)

    suffix = Path(original_filename).suffix.lower()
    if suffix not in {".jpg", ".jpeg", ".png", ".webp"}:
        raise ValueError(f"Unsupported image format: {suffix}")

    filename = f"{uuid.uuid4()}{suffix}"
    filepath = POSTERS_DIR / filename

    try:
        image = Image.open(BytesIO(file_bytes))
        image.verify()
    except (OSError, SyntaxError):
        raise ValueError("Invalid image file")

    image = Image.open(BytesIO(file_bytes))
    if image.width > MAX_WIDTH:
        ratio = MAX_WIDTH / image.width
        new_height = int(image.height * ratio)
        image = image.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)  # pyright: ignore[reportUnknownMemberType]

    image.save(filepath)
    return f"/uploads/posters/{filename}"
