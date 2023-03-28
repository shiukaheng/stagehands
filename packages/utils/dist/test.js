"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PairingServer_1 = require("./PairingServer");
const server = new PairingServer_1.PairingServer();
server.startDiscoverListener();
// const client = new PairingClient();
// client.startAdvertise();
