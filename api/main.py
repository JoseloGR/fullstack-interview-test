from fastapi import FastAPI, status
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/", tags=["Home"])
def home():
  return {'version': '1.0.0'}

@app.get("/api/v1/branches", tags=["Git"])
def get_branches():
  status_code = status.HTTP_204_NO_CONTENT
  result = []
  if result:
    status_code = status_code.HTTP_200_OK
  return JSONResponse(status_code=status_code, content=result)
