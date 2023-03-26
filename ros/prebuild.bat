@echo off

@REM :: Check for uncommitted changes
@REM git status --porcelain | findstr /r "^.\+" > nul && (
@REM   echo Error: There are uncommitted changes. Please commit or stash them before running prebuild.
@REM   exit /b 1
@REM )

:: Run docker-compose
docker-compose -f .\docker-compose.yaml -f .\docker-compose.prod.yaml -f .\docker-compose.useprebuild.yaml -f .\docker-compose.prebuild.yaml up

:: Commit changes with prebuild message
git add .
git commit -m "Prebuild changes"
echo Success: Prebuild completed successfully and changes were committed.