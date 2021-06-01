from pydantic import BaseModel

class PullRequestModel(BaseModel):
  title: str
  body: str
  head: str
  base: str