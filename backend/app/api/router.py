from fastapi import APIRouter

from app.api.v1.endpoints.health import router as health_router
from app.api.v1.endpoints.profile import router as profile_router
from app.api.v1.endpoints.scans import router as scans_router

api_router = APIRouter()
api_router.include_router(health_router, tags=["Health"])
api_router.include_router(profile_router, prefix="/profile", tags=["Profile"])
api_router.include_router(scans_router, prefix="/scans", tags=["Scans"])

