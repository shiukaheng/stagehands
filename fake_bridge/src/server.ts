import { TopicServer } from "webtopics"
import { Server } from "socket.io"
import { FleetState, Presets, liveFleetChannel, presetsChannel } from "@schema/dist"

export class FakeBridgeServer {
    // Initialize variables
    private topicServer: TopicServer
    private io: Server
    private fleetState: FleetState = {
        "bot1": {
            name: "Alice",
            position: [1, 0, 0],
            rotation: [0, 0, 0, 1]
        },
        "bot2": {
            name: "Bob",
            position: [-1, 0, 0],
            rotation: [0, 0, 0, 1]
        }
    }
    private presetsState: Presets = {
        "preset1": {
            name: "Presets 1",
            bots: {}
        },
        "preset2": {
            name: "Presets 2",
            bots: {}
        }
    }

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
        this.topicServer = new TopicServer(this.io, {logTopics: true})
        console.log(`✅ Fake bridge server running on port ${port}`)
        setInterval(()=>{
            this.topicServer.pub(liveFleetChannel, this.fleetState)
            this.topicServer.pub(presetsChannel, this.presetsState)
        }, 1000)
        
    }
}