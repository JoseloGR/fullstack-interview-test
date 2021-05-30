import logging
from git import Repo
from config import LOCAL_REPO_PATH

log = logging.getLogger("API")

def get_repo():
  log.info(LOCAL_REPO_PATH)
  return Repo(LOCAL_REPO_PATH)

def get_all_branches():
  repo = get_repo()
  return [{'name': b.name} for b in repo.heads]
