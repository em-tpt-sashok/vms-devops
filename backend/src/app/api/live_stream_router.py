import src.app.services.live_stream_service as live_stream_service
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from src.app.config.setting import settings

router = APIRouter()


@router.get("/nvr")
async def watch_nvr_live_stream():
    return StreamingResponse(
        live_stream_service.generate_frames(rtsp_url=settings.RTSP_NVR_URL),
        media_type="multipart/x-mixed-replace; boundary=frame",
    )


@router.get("/cam")
async def watch_cam_live_stream():
    return StreamingResponse(
        live_stream_service.generate_frames(rtsp_url=settings.RTSP_CAM_URL),
        media_type="multipart/x-mixed-replace; boundary=frame",
    )
