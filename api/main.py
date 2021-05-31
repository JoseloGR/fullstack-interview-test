from fastapi import (
  FastAPI,
  status,
  Body
)
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from git_ops import (
  get_all_branches,
  get_branch_detail,
  get_remote_pull_requests,
  create_remote_pull_requests,
  close_remote_pull_requests
)
from models import PullRequestModel

app = FastAPI()

origins = ['*']

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

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

@app.get("/api/v1/branches/{branch}", tags=["Git"])
def get_branch_commits(branch: str):
  status_code = status.HTTP_204_NO_CONTENT
  result = get_branch_detail(branch)
  if result:
    status_code = status.HTTP_200_OK
  return JSONResponse(status_code=status_code, content=result)


@app.post("/api/v1/pull-requests", tags=["Git"])
def create_pull_requests(body: PullRequestModel = Body(...)):
  payload = jsonable_encoder(body)
  status_code = status.HTTP_400_BAD_REQUEST
  result = create_remote_pull_requests(payload)
  if result:
    status_code = status.HTTP_201_CREATED
  return JSONResponse(status_code=status_code, content={'success': result})

@app.patch("/api/v1/pull-requests/{number}", tags=["Git"])
def close_pull_requests(number: str):
  status_code = status.HTTP_204_NO_CONTENT
  result = close_remote_pull_requests(number)
  if result:
    status_code = status.HTTP_200_OK
  return JSONResponse(status_code=status_code, content={'success': result})

@app.get("/api/v1/pull-requests", tags=["Git"])
def get_pull_requests():
  status_code = status.HTTP_204_NO_CONTENT
  result = get_remote_pull_requests()
  if result:
    status_code = status.HTTP_200_OK
  return JSONResponse(status_code=status_code, content=result)
