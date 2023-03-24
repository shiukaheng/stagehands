rm ~/.docker/config.json # Fix for docker-compose on macos
sudo docker-compose -f docker-compose.yaml -f docker-compose.macos.yaml up -d --build