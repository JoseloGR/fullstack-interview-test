import logging
from git import Repo
from config import LOCAL_REPO_PATH

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
