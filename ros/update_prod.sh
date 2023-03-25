docker build --platform linux/arm64 -t shiukaheng/stagehands:prod -f ./basebot/Dockerfile ../
docker push shiukaheng/stagehands:prod