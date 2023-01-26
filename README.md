# Stagehands

## Usage of ROS installation script
`NOTE: The install script is only meant to work on DICE computers`
A script has been provided to prepare the DICE environment for ROS development on the turtlebot. To use the script:
- Clone your own repository and open a terminal in this repository
- Run `./install.sh` - it sets up a catkin workspace, installs dependencies, and sets up bashrc on both DICE and the Turtlebot
- After installation, you can quickly ssh into your Turtlebot with macro `turtleshell`
- You can then directly develop your packages in your repository, which already has gitignore configured to not commit builds and dependencies
