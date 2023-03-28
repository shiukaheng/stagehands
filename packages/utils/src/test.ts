import { PairingClient } from "./PairingClient";
import { PairingServer } from "./PairingServer";

const server = new PairingServer();
server.startDiscoverListener();

// const client = new PairingClient();
// client.startAdvertise();