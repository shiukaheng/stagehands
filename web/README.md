# The Web App

## Installation 

The first step is to install [node](https://nodejs.org/en/download/), the backend for the project. 
Then navigate to the `web` folder and run:

```sh
npm install
```

If you are using VSCode then install the tailwind CSS extension from the marketplace.

## Developing

The homepage for the app is in the root of the `web` folder and is `index.html`.
The code/backend can be sound in the `src` folder, this is also where all of the assets and stylesheets are stored.

## Running

To run the website locally use:

```sh
npm run dev
```

This will give you a url you can paste into your browser which will show the website or any errors

## Features 

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
