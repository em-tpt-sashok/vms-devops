from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_V1_PREFIX: str = "/api/v1"

    APP: str = "src.app.main:app"
    HOST: str = "localhost"
    PORT: int = 8000
    RELOAD: bool = True

    TITLE: str = "VMS PoC"
    VERSION: str = "1.0"
    DESCRIPTION: str = "Performing **PAN**, **TILT** and **ZOOM** operations using **ONVIF** and Displaying **Live Stream**"
    DOCS_URL: str = "/docs"
    REDOC_URL: str = "/redoc"
    OPENAPI_URL: str = "/openapi.json"

    CAMERA_IP: str = "172.16.150.26"
    CAMERA_PORT: int = 8888
    NVR_USERNAME: str = "admin"
    NVR_PASSWORD: str = "admin123"

    RTSP_NVR_URL: str = "rtsp://admin:admin123@172.16.150.100:554"
    RTSP_CAM_URL: str = (
        "rtsp://admin:admin123@172.16.150.100:554/cam/realmonitor?channel=1&subtype=0"
    )


settings = Settings()
