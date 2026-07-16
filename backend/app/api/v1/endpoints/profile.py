from typing import Annotated

from fastapi import APIRouter, Depends

from app.api.dependencies import get_request_context
from app.schemas.auth import RequestContext
from app.schemas.profile import PreferencesUpsertRequest, UserProfileResponse

router = APIRouter()


@router.get("/me", response_model=UserProfileResponse)
async def get_my_profile(
    request_context: Annotated[RequestContext, Depends(get_request_context)],
) -> UserProfileResponse:
    return UserProfileResponse(
        id="current-user",
        display_name=None,
        preferences={
            "lifestyle": {
                "profile_id": "general-user",
                "answers": [],
            },
            "health_goals": [],
            "dietary_preferences": [],
            "allergies": [],
            "age": None,
        },
    )


@router.put("/me/preferences", response_model=UserProfileResponse)
async def upsert_preferences(
    payload: PreferencesUpsertRequest,
    request_context: Annotated[RequestContext, Depends(get_request_context)],
) -> UserProfileResponse:
    return UserProfileResponse(
        id="current-user",
        display_name=None,
        preferences=payload.model_dump(),
    )
