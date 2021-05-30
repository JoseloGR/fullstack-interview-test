from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from git_ops import get_all_branches

app = FastAPI()

@app.get("/", tags=["Home"])
def home():
  return {'version': '1.0.0'}

@app.get("/api/v1/branches", tags=["Git"])
def get_branches():
  status_code = status.HTTP_204_NO_CONTENT
  result = get_all_branches()
  if result:
    status_code = status.HTTP_200_OK
  return JSONResponse(status_code=status_code, content=result)
