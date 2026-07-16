from app.schemas.auth import RequestContext


def build_user_scoped_headers(request_context: RequestContext) -> dict[str, str]:
    return {"Authorization": f"Bearer {request_context.access_token}"}

