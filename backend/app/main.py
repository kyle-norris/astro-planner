
from fastapi import FastAPI
from .routers import starmaps

app = FastAPI()

app.include_router(starmaps.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}


