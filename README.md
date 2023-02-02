# 🤝 Stagehands

## Software Plan

### Front-end
- Potential components
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
- Basic functionality
  - Host a socket.io server to facilitate communication between bots and web clients
  - Almost stateless
    - Only stores presets and stage boundaries, and translates them to messages to send to bots when requested by web clients
- [Implementation details](https://pretty-minute-b54.notion.site/Bridge-d627c53e25554cecbe07ece64f4c92f4)

### TurtleBot
- TurtleBot
  - Object detection while pathfinding 
  - Sending obstacle data to central server