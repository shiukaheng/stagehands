"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PairingClient_1 = require("./PairingClient");
// const server = new PairingServer();
// server.startDiscoverListener();
const client = new PairingClient_1.PairingClient({
    pairingPort: 3435
});
client.startAdvertise();
