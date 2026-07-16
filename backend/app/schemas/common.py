from pydantic import BaseModel, Field


class MetaEnvelope(BaseModel):
    request_id: str = Field(default="foundation-request")
    timestamp: str = Field(default="1970-01-01T00:00:00Z")

