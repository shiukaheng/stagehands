import { TopicServer } from "webtopics"
import { Server } from "socket.io"
import { liveFleetChannel, presetsChannel } from "./channels";
import { FleetState, Presets } from "./schemas";
export class FakeBridgeServer {
    // Initialize variables
    private topicServer: TopicServer
    private io: Server
    private fleetState: FleetState = {
        "bot1": {
            name: "bot1",
            position: [0, 0, 0],
            rotation: [0, 0, 0, 1]
        },
        "bot2": {
            name: "bot2",
            position: [0, 0, 0],
            rotation: [0, 0, 0, 1]
        }
    }
    private presetsState: Presets = {}

    /**
     * Constructor for FakeBridgeServer
     * @param port Port to run the server on
     */
    constructor(port: number=3000) {
        this.io = new Server(port, {
            cors: {
                origin: "*",
            }
        })
        this.topicServer = new TopicServer(this.io)
        this.topicServer.pub(liveFleetChannel, this.fleetState)
        this.topicServer.pub(presetsChannel, this.presetsState)
        console.log(`✅ Fake bridge server running on port ${port}`)
    }
}