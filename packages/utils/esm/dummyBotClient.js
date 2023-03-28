import { botPairingService } from "schema";
import { Server } from "socket.io";
import { TopicServer } from "webtopics";
import { PairingClient } from "./PairingClient";
export class simulatedBotClient {
    constructor() {
        this.pairingClient = new PairingClient();
        this.socketServer = new Server(3435);
        this.botPairingWebTopicServer = new TopicServer(this.socketServer);
        this.bridgeIPPort = "not found";
    }
    runPairingService() {
        this.pairingClient.startAdvertise();
        this.botPairingWebTopicServer.srv(botPairingService, (req) => {
            this.bridgeIPPort = req.bridgeIp + ":" + req.bridgePort;
            console.log(this.bridgeIPPort);
        });
    }
}