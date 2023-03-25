local current_dir=$(pwd)
cd /home/pi/stagehands/ros
sudo docker-compose -f ./docker-compose.yaml -f ./docker-compose.prod.yaml
cd "$current_dir"