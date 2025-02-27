
from fastapi import APIRouter, Depends, HTTPException
from ..content import starmaps
from fastapi.responses import StreamingResponse
import io

router = APIRouter(
    prefix="/starmaps",
)

@router.get("/")
async def get_starmap():
    try:
        buf = io.BytesIO()
        starmaps.createChart(buf)
        buf.seek(0)
        return StreamingResponse(buf, media_type="image/png")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Could not generate Starmap.")
