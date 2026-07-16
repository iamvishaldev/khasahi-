from fastapi import Header, HTTPException, status

from app.schemas.auth import RequestContext


def get_request_context(
    authorization: str | None = Header(default=None),
) -> RequestContext:
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authorization header",
        )

    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header",
        )

    return RequestContext(access_token=token)
