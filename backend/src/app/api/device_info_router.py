from fastapi import APIRouter
from onvif import ONVIFCamera
from urllib.parse import urlparse
from src.app.schemas.DeviceInfoReqSch import DeviceInfoRequest


router = APIRouter()


# ----------- DEVICE INFO ENDPOINT -----------


@router.post("/device-info")
def get_device_info(body: DeviceInfoRequest):
    parsed = urlparse(body.xaddr)
    ip = parsed.hostname
    port = parsed.port or 80

    try:
        cam = ONVIFCamera(ip, port, body.username, body.password)
        devicemgmt = cam.create_devicemgmt_service()
        info = devicemgmt.GetDeviceInformation()
        return {
            "ip": ip,
            "port": port,
            "manufacturer": info.Manufacturer,
            "model": info.Model,
            "firmware_version": info.FirmwareVersion,
            "serial_number": info.SerialNumber,
            "hardware_id": info.HardwareId,
        }
    except Exception as e:
        return {"error": str(e)}
