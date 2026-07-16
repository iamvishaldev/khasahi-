from supabase import Client, create_client

from app.core.config import get_settings


class SupabaseService:
    def __init__(self) -> None:
        settings = get_settings()
        self._client: Client = create_client(
            settings.supabase_url,
            settings.supabase_service_role_key,
        )

    @property
    def client(self) -> Client:
        return self._client

