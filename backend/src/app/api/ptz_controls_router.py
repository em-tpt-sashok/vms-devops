import time
from fastapi import APIRouter
from onvif import ONVIFCamera
from src.app.config.setting import settings

router = APIRouter()


cam = ONVIFCamera(
    settings.CAMERA_IP,
    settings.CAMERA_PORT,
    settings.NVR_USERNAME,
    settings.NVR_PASSWORD,
)
media = cam.create_media_service()
ptz = cam.create_ptz_service()
profile = media.GetProfiles()[0]


def move_camera(pan=0.0, tilt=0.0, zoom=0.0, duration=1):
    req = ptz.create_type("ContinuousMove")
    req.ProfileToken = profile.token
    req.Velocity = {}

    if pan != 0.0 or tilt != 0.0:
        req.Velocity["PanTilt"] = {"x": pan, "y": tilt}
    if zoom != 0.0:
        req.Velocity["Zoom"] = {"x": zoom}

    ptz.ContinuousMove(req)
    time.sleep(duration)
    ptz.Stop({"ProfileToken": profile.token})


@router.post("/move/left")
def move_left():
    move_camera(pan=-0.5)
    return {"status": "Moving left"}


@router.post("/move/right")
def move_right():
    move_camera(pan=0.5)
    return {"status": "Moving right"}


@router.post("/move/up")
def move_up():
    move_camera(tilt=0.5)
    return {"status": "Moving up"}


@router.post("/move/down")
def move_down():
    move_camera(tilt=-0.5)
    return {"status": "Moving down"}


@router.post("/stop")
def stop_motion():
    ptz.Stop({"ProfileToken": profile.token})
    return {"status": "PTZ motion stopped"}
