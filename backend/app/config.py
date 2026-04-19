from typing import ClassVar

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config: ClassVar[SettingsConfigDict] = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

    cors_origins: list[str] = ["http://localhost:3000"]
    database_url: str = "postgresql://postgres:dev@localhost:5432/bekzhan"

    @property
    def safe_database_url(self) -> str:
        """Render gives postgres:// but SQLAlchemy 2.x requires postgresql://."""
        url = self.database_url
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        return url
    jwt_secret: str = "change-me-in-production"
    jwt_algorithm: str = "HS256"
    jwt_expiration_hours: int = 24
    upload_dir: str = "uploads"
    cloudinary_cloud_name: str = ""
    cloudinary_api_key: str = ""
    cloudinary_api_secret: str = ""
    owner_username: str = "admin"
    owner_password_hash: str = ""


settings = Settings()
