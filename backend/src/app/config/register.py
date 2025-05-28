import src.app.api.device_info_router as device_info
import src.app.api.live_stream_router as live_stream
import src.app.api.ptz_controls_router as ptz_controls
import src.app.api.video_settings_router as video_settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.app.config.setting import settings


def register_app():
    app = FastAPI(
        title=settings.TITLE,
        version=settings.VERSION,
        description=settings.DESCRIPTION,
        docs_url=settings.DOCS_URL,
        redoc_url=settings.REDOC_URL,
        openapi_url=settings.OPENAPI_URL,
    )

    register_middelware(app)

    register_routers(app)

    return app


def register_middelware(app: FastAPI):
    # Allow frontend access
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )


def register_routers(app: FastAPI):
    app.include_router(
        device_info.router, prefix=f"{settings.API_V1_PREFIX}", tags=["Device Info"]
    )

    app.include_router(
        live_stream.router,
        prefix=f"{settings.API_V1_PREFIX}/live-stream",
        tags=["Live Streams using OpenCV"],
    )

    app.include_router(
        ptz_controls.router, prefix=f"{settings.API_V1_PREFIX}", tags=["PTZ Controls"]
    )

    app.include_router(
        video_settings.router,
        prefix=f"{settings.API_V1_PREFIX}",
        tags=["Video Settings"],
    )
