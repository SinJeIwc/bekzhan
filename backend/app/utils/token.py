from datetime import UTC, datetime, timedelta

import jwt

from app.config import settings


def create_access_token(sub: str) -> str:
    expire = datetime.now(UTC) + timedelta(hours=settings.jwt_expiration_hours)
    payload = {"sub": sub, "exp": expire}
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)  # pyright: ignore[reportUnknownMemberType]


def decode_access_token(token: str) -> dict[str, str | int]:
    return jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])  # pyright: ignore[reportUnknownMemberType]
