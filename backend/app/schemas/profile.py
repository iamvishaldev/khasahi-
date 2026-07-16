from typing import Literal

from pydantic import BaseModel


LifestyleProfileId = Literal[
    "general-user",
    "student",
    "it-professional",
    "fitness-enthusiast",
    "parent",
    "senior-citizen",
]


class LifestyleFieldAnswer(BaseModel):
    field_id: str
    value: str | int | list[str]


class LifestyleSelection(BaseModel):
    profile_id: LifestyleProfileId
    answers: list[LifestyleFieldAnswer]


class PreferencesUpsertRequest(BaseModel):
    lifestyle: LifestyleSelection
    health_goals: list[str]
    dietary_preferences: list[str]
    allergies: list[str]
    age: int | None = None


class UserProfileResponse(BaseModel):
    id: str
    display_name: str | None
    preferences: PreferencesUpsertRequest
