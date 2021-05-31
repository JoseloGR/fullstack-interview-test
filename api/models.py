from pydantic import BaseModel

class PullRequestModel(BaseModel):
  title: str
  description: str
  head: str
  base: str