"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discovery_1 = require("./discovery");
const server = new discovery_1.PairingServer();
server.startDiscoverListener();
const client = new discovery_1.PairingClient();
client.startAdvertise();
