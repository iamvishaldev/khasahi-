from functools import lru_cache

from pydantic import BeforeValidator
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Annotated


def parse_cors_origins(value: str | list[str]) -> list[str]:
    if isinstance(value, list):
        return value
    return [item.strip() for item in value.split(",") if item.strip()]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    app_env: str = Field(default="development", alias="APP_ENV")
    api_v1_prefix: str = Field(default="/v1", alias="API_V1_PREFIX")
    project_name: str = Field(default="Khasahi AI API", alias="PROJECT_NAME")
    supabase_url: str = Field(alias="SUPABASE_URL")
    supabase_service_role_key: str = Field(alias="SUPABASE_SERVICE_ROLE_KEY")
    openai_api_key: str = Field(alias="OPENAI_API_KEY")
    openai_model: str = Field(default="gpt-5-mini", alias="OPENAI_MODEL")
    cors_origins: Annotated[
        list[str],
        BeforeValidator(parse_cors_origins),
    ] = Field(default_factory=list, alias="CORS_ORIGINS")


@lru_cache
def get_settings() -> Settings:
    return Settings()
