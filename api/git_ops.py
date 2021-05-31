import logging
import requests
from git import Repo
from config import LOCAL_REPO_PATH, GIT_USER, GIT_PROJECT_NAME

log = logging.getLogger("API")

def get_repo():
  log.info(LOCAL_REPO_PATH)
  return Repo(LOCAL_REPO_PATH)

def get_all_branches() -> list:
  repo = get_repo()
  return [{'name': b.name} for b in repo.heads]

def get_branch_detail(branch: str) -> list:
  repo = get_repo()
  commits = []
  branch_commits = list(repo.iter_commits(branch))
  if branch_commits:
    commits = [
      {
        'summary': commit.summary,
        'author': commit.author.name,
        'author_email': commit.author.email,
        'hexsha': str(commit.hexsha),
        'datetime': str(commit.authored_datetime),
        'count': commit.count(),
        'size': commit.size
      } for commit in branch_commits
    ]
  return commits

def get_remote_pull_requests(state: str = 'all') -> list:
  results = []
  headers = {
    "Accept": "application/vnd.github.v3+json"
  }
  response = requests.get(
    f"https://api.github.com/repos/{GIT_USER}/{GIT_PROJECT_NAME}/pulls?state={state}",
    headers=headers
  )
  response = response.json() if response.status_code == 200 else []

  if response:
    results = [
      {
        'title': pr.get('title', 'untitled'),
        'body': pr.get('body', ''),
        'status': pr.get('state', 'closed'),
        'author': pr.get('head', {}).get('user', {}).get('login', 'owner')
      } for pr in response
    ]
  return results

def create_remote_pull_requests(payload: dict) -> bool:
  headers = {
    "Accept": "application/vnd.github.v3+json"
  }
  response = requests.get(
    f"https://api.github.com/repos/{GIT_USER}/{GIT_PROJECT_NAME}/pulls",
    headers=headers,
    json=payload
  )
  log.info(str(response))
  return response.status_code == 201
