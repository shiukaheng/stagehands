import { PairingClient, PairingServer } from "./discovery";

const server = new PairingServer();
server.startDiscoverListener();

const client = new PairingClient();
client.startAdvertise();