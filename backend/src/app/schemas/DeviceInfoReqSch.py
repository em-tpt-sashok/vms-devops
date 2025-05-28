from pydantic import BaseModel
from pydantic import Field


class DeviceInfoRequest(BaseModel):
    xaddr: str = Field(default="http://172.16.150.26:8888")
    username: str | None = None
    password: str | None = None
