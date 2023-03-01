# 🌉 Bridge

## Features
- Maintains preset information and stage boundaries
- Host a [socket.io](http://socket.io/) server to facilitate communication between bots and web clients
  - Bots use it to get information about stage boundaries and location of other bots
  - Web clients use it to send commands to save and recall presets
    
## [Implementation guide](https://pretty-minute-b54.notion.site/Bridge-implementation-d627c53e25554cecbe07ece64f4c92f4)

## Installation
Make sure you are within the "./bridge" subdirectory
```bash
cd bridge
```
The bridge also uses [node](https://nodejs.org/en/download/), you can install the dependencies with:
```bash
npm install 
```

## Usage 
During development, run the following to run your code, and automatically re-run it if any code was changed:
```bash
npm dev
```


To create a production ready version:
```bash
npm build
```

To create a production ready version and run it:
```bash
npm start
```
