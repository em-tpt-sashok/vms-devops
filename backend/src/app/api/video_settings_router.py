from fastapi import APIRouter
from fastapi import HTTPException
from onvif import ONVIFCamera
from src.app.config.setting import settings
from src.app.schemas.FrameBitRateSch import FrameRateBitrateUpdate

router = APIRouter()

cam = ONVIFCamera(
    settings.CAMERA_IP,
    settings.CAMERA_PORT,
    settings.NVR_USERNAME,
    settings.NVR_PASSWORD,
)

media = cam.create_media_service()
profile = media.GetProfiles()[0]


@router.post("/encoder/update")
def update_framerate_bitrate(settings: FrameRateBitrateUpdate):
    try:
        config = media.GetVideoEncoderConfigurations()[0]
        config.RateControl.BitrateLimit = settings.bitrate
        config.RateControl.FrameRateLimit = settings.framerate

        media.SetVideoEncoderConfiguration(
            {"Configuration": config, "ForcePersistence": True}
        )

        return {"status": "Frame rate and bitrate updated successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Update failed: {str(e)}")
