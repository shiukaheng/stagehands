xhost local:root
sudo docker-compose -f docker-compose-linux.yaml up -d --build
# If docker container not visible from VSCode / dev container extensions, make sure they are in the same context.