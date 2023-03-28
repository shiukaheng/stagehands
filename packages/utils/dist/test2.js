"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discovery_1 = require("./discovery");
// const server = new PairingServer();
// server.startDiscoverListener();
const client = new discovery_1.PairingClient({
    pairingPort: 3435
});
client.startAdvertise();
