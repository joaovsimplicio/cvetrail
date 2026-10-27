from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Configuration read from environment variables (e.g. DATABASE_URL)."""

    app_name: str = "CVEtrail"
    database_url: str


@lru_cache
def get_settings() -> Settings:
    return Settings()
