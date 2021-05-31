import os
from dotenv import load_dotenv

load_dotenv()

LOCAL_REPO_PATH = os.getenv('LOCAL_REPO_PATH')
GIT_USER = os.getenv("GIT_USER")
GIT_PROJECT_NAME = os.getenv("GIT_PROJECT_NAME")
