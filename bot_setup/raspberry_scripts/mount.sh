# Symlinks path identical to docker copies

# COPY ./ros/basebot/sshd_config /etc/ssh/sshd_config:
sudo ln -s /home/pi/stagehands/ros/basebot/sshd_config /etc/ssh/sshd_config

# COPY ./ros/basebot/src/ .
sudo ln -s /home/pi/stagehands/ros/basebot/src /home/pi/catkin_ws/src

# COPY ../packages ./stagehands-js/packages
# COPY ../package.json ./stagehands-js
# COPY ../package-lock.json ./stagehands-js
sudo ln -s /home/pi/stagehands/packages /home/pi/stagehands-js/packages
sudo ln -s /home/pi/stagehands/package.json /home/pi/stagehands-js/package.json
sudo ln -s /home/pi/stagehands/package-lock.json /home/pi/stagehands-js/package-lock.json

# COPY ./ros/basebot/map/ ./map/
sudo ln -s /home/pi/stagehands/ros/basebot/map /map

# COPY ./ros/basebot/scripts/ ./scripts/
sudo ln -s /home/pi/stagehands/ros/basebot/scripts /scripts