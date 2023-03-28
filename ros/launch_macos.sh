rm ~/.docker/config.json # Fix for docker-compose on macos
sudo docker-compose -f docker-compose.yaml -f docker-compose.macos.yaml -f docker-compose.dev.yaml up -d