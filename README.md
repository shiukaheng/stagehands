# 🤝 Stagehands

## Software Plan

### Front End
- Setup View
  - Draw stage boundries
    - Easy - Draw 2D boundary relative to known robot pose
    - Moderate - WebXR client that allows drawing boundary in AR using a mobile device (which requires localizing the robot relative to the mobile device)
  - Setup robots
    - Pairing to system (LAN)
    - Naming
    - Give unique LEDs
- Default view 
  - Visualization component (3D map view, by default 
    - React model of the mic stand with movable components
    - Battery icon that listens for the battery level and sends warning at 10%
  - Editable ‘Playlist’ of poses/locationsThe mapping (possibly AR)
  - Big stop button
  - Selection panel (allows you to cherry pick on a bot)
    - Detailed status
    - Virtual joystick
  
### Bridge
- Bridge
  - Serialisation of that pose for presets
  - Translation from web pose to target pose on ROS
  - Pathfinding to target pose 
  
### TurtleBot
- TurtleBot
  - Object detection while pathfinding 
  - Sending obstacle data to central server