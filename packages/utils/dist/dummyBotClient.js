"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulatedBotClient = void 0;
const schema_1 = require("schema");
const socket_io_1 = require("socket.io");
const webtopics_1 = require("webtopics");
const PairingClient_1 = require("./PairingClient");
class simulatedBotClient {
    constructor() {
        this.pairingClient = new PairingClient_1.PairingClient();
        this.socketServer = new socket_io_1.Server(3435);
        this.botPairingWebTopicServer = new webtopics_1.TopicServer(this.socketServer);
        this.bridgeIPPort = "not found";
    }
    runPairingService() {
        this.pairingClient.startAdvertise();
        this.botPairingWebTopicServer.srv(schema_1.botPairingService, (req) => {
            this.bridgeIPPort = req.bridgeIp + ":" + req.bridgePort;
            console.log(this.bridgeIPPort);
        });
    }
}
exports.simulatedBotClient = simulatedBotClient;
