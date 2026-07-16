from pydantic import BaseModel


class RequestContext(BaseModel):
    access_token: str

