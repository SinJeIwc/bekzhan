from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

    cors_origins: list[str] = ["http://localhost:3000"]
    database_url: str = "postgresql://postgres:dev@localhost:5432/bekzhan"
    jwt_secret: str = "change-me-in-production"
    jwt_algorithm: str = "HS256"
    jwt_expiration_hours: int = 24
    upload_dir: str = "uploads"
    owner_username: str = "admin"
    owner_password_hash: str = ""


settings = Settings()
