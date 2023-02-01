# 🤝 Stagehands

## Software Plan

### Front End
1. Setup View
  a. Draw stage boundries
    i. Easy - Draw 2D boundary relative to known robot pose
    ii. Moderate - WebXR client that allows drawing boundary in AR using a mobile device (which requires localizing the robot relative to the mobile device)
  b. Setup robots
    i. Pairing to system (LAN)
    ii. Naming
    iii. Give unique LEDs
2. Default view 
  a. Visualization component (3D map view, by default 
    i. React model of the mic stand with movable components
    ii. Battery icon that listens for the battery level and sends warning at 10%
  b. Editable ‘Playlist’ of poses/locationsThe mapping (possibly AR)
  c. Big stop button
  d. Selection panel (allows you to cherry pick on a bot)
    i. Detailed status
    ii. Virtual joystick
### Bridge
3. Bridge
  a. Serialisation of that pose for presets
  b. Translation from web pose to target pose on ROS
  c. Pathfinding to target pose 
  
### TurtleBot
4. TurtleBot
  a. Object detection while pathfinding 
  b. Sending obstacle data to central server


## Usage of ROS installation script
`NOTE: The install script is only meant to work on DICE computers`
A script has been provided to prepare the DICE environment for ROS development on the turtlebot. To use the script:
- Clone your own repository and open a terminal in this repository
- Run `./install.sh` - it sets up a catkin workspace, installs dependencies, and sets up bashrc on both DICE and the Turtlebot
- After installation, you can quickly ssh into your Turtlebot with macro `turtleshell`
- You can then directly develop your packages in your repository, which already has gitignore configured to not commit builds and dependencies
