xhost local:root # Needed to allow GUI to be displayed
sudo docker-compose -f docker-compose.yaml -f docker-compose.linux.yaml up -d --build