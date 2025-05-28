from src.app.config.register import register_app

app = register_app()


@app.get("/", tags=["VMS PoC Root"])
async def root():
    return {"VMS PoC": "VMS PoC ONVIF PTZ Operation Controls"}


@app.get("/", tags=["API Health Check"])
async def health_check():
    return {"Status": "Healthy"}
