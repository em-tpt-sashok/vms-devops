from pydantic import BaseModel


class FrameRateBitrateUpdate(BaseModel):
    bitrate: int
    framerate: int
