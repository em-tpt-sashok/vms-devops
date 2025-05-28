import uvicorn
from src.app.config.setting import settings

if __name__ == "__main__":
    uvicorn.run(
        settings.APP, host=settings.HOST, port=settings.PORT, reload=settings.RELOAD
    )
