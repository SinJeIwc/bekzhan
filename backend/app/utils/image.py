import uuid
from io import BytesIO
from pathlib import Path

from PIL import Image

from app.config import settings

MAX_WIDTH = 800
POSTERS_DIR = Path(settings.upload_dir) / "posters"

_use_cloudinary = bool(settings.cloudinary_cloud_name)

if _use_cloudinary:
    import cloudinary
    import cloudinary.uploader

    cloudinary.config(
        cloud_name=settings.cloudinary_cloud_name,
        api_key=settings.cloudinary_api_key,
        api_secret=settings.cloudinary_api_secret,
        secure=True,
    )


def _resize(file_bytes: bytes, original_filename: str) -> tuple[Image.Image, str]:
    """Validate, resize and return the image with its format suffix."""
    suffix = Path(original_filename).suffix.lower()
    if suffix not in {".jpg", ".jpeg", ".png", ".webp"}:
        raise ValueError(f"Unsupported image format: {suffix}")

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

    return image, suffix


def delete_poster(poster_path: str) -> None:
    """Delete a poster from Cloudinary or local filesystem."""
    if _use_cloudinary and "res.cloudinary.com" in poster_path:
        try:
            parts = poster_path.split("/upload/")
            if len(parts) == 2:
                path = parts[1]
                if path.startswith("v") and "/" in path:
                    path = path.split("/", 1)[1]
                public_id = Path(path).with_suffix("").as_posix()
                cloudinary.uploader.destroy(public_id)
        except Exception:
            pass
    else:
        # Local filesystem
        relative = poster_path.lstrip("/").removeprefix("uploads/")
        filepath = Path(settings.upload_dir) / relative
        filepath.unlink()


def save_poster(file_bytes: bytes, original_filename: str) -> str:
    """Upload a poster to Cloudinary or save locally."""
    image, suffix = _resize(file_bytes, original_filename)

    if _use_cloudinary:
        buffer = BytesIO()
        fmt = "JPEG" if suffix in {".jpg", ".jpeg"} else suffix.lstrip(".").upper()
        image.save(buffer, format=fmt)
        buffer.seek(0)

        public_id = f"posters/{uuid.uuid4()}"
        result = cloudinary.uploader.upload(
            buffer,
            public_id=public_id,
            overwrite=True,
            resource_type="image",
        )
        return result["secure_url"]

    # Local filesystem
    POSTERS_DIR.mkdir(parents=True, exist_ok=True)
    filename = f"{uuid.uuid4()}{suffix}"
    filepath = POSTERS_DIR / filename
    image.save(filepath)
    return f"/uploads/posters/{filename}"
