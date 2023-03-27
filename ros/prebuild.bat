@echo off

:: Check for uncommitted changes
git status --porcelain | findstr /r "^.\+" > nul && (
  echo Error: There are uncommitted changes. Please commit or stash them before running prebuild.
  exit /b 1
)

:: Run docker-compose
docker-compose -f .\docker-compose.yaml -f .\docker-compose.prod.yaml -f .\docker-compose.useprebuild.yaml -f .\docker-compose.prebuild.yaml up

:: Commit changes with prebuild message
git add .
git commit -m "Prebuild changes"
echo Success: Prebuild completed successfully and changes were committed.