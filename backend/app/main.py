
from fastapi import FastAPI
from .routers import starmaps
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(starmaps.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}


