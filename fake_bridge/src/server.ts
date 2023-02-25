import { TopicServer } from "webtopics"
import { Server } from "socket.io"
import { liveFleetChannel, presetsChannel } from "./channels";
import { FleetState } from "./schemas";

const io = new Server(3000, {
    cors: {
        origin: "*",
    }
})

const topicServer = new TopicServer(io)

// Initialize channels
topicServer.initChannels([liveFleetChannel, presetsChannel])

const fleetState: FleetState = {
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

const presetsState = {}

// Set initial state
topicServer.pub(liveFleetChannel, fleetState)
topicServer.pub(presetsChannel, presetsState)