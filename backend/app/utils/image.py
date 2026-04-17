import uuid
from io import BytesIO
from pathlib import Path

from PIL import Image

from app.config import settings

POSTERS_DIR = Path(settings.upload_dir) / "posters"
MAX_WIDTH = 800


def save_poster(file_bytes: bytes, original_filename: str) -> str:
    POSTERS_DIR.mkdir(parents=True, exist_ok=True)

    suffix = Path(original_filename).suffix.lower()
    if suffix not in {".jpg", ".jpeg", ".png", ".webp"}:
        raise ValueError(f"Unsupported image format: {suffix}")

    filename = f"{uuid.uuid4()}{suffix}"
    filepath = POSTERS_DIR / filename

    image = Image.open(BytesIO(file_bytes))
    if image.width > MAX_WIDTH:
        ratio = MAX_WIDTH / image.width
        new_height = int(image.height * ratio)
        image = image.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)  # pyright: ignore[reportUnknownMemberType]

    image.save(filepath)
    return f"/upload/posters/{filename}"
