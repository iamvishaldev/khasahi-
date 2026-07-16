from openai import OpenAI

from app.core.config import get_settings


class OpenAIService:
    def __init__(self) -> None:
        settings = get_settings()
        self._client = OpenAI(api_key=settings.openai_api_key)
        self._model = settings.openai_model

    @property
    def model(self) -> str:
        return self._model

    @property
    def client(self) -> OpenAI:
        return self._client

