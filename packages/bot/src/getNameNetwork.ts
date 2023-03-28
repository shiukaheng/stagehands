// Gets the first name on the network, waits for 10 seconds, if there is a name, console.log it, otherwise, exit with error code 1

import { PairingServer } from "utils";

const server = new PairingServer();
server.startDiscoverListener();
server.subBots((availableBots) => {
    if (availableBots.size > 0) {
        // Get the first name on the network
        const name = availableBots.keys().next().value;
        console.log(name);
        process.exit(0);
    }
});
setTimeout(() => {
    console.error("No bot found on the network");
    process.exit(1);
}, 10000);