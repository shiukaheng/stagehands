import { TopicServer } from "webtopics"
import { Server } from "socket.io"
import { FleetState, PresetSet, fleetTopic, stageTopic, stopBotClearService } from "@schema/index"
import { createNewBotState } from "./utils"
import { z } from "zod"
import { ServiceChannel } from "webtopics/dist/utils/Channel"

export class FakeBridgeServer {
    // Initialize variables
    private topicServer: TopicServer
    private io: Server
    private fleetState: FleetState = {
        "1": createNewBotState({name: "Alice"}),
    }
    private presetsState: PresetSet = {
    }
    private botVelocity = 0.1
    private botPoseTolerance = 0.01
    private simulationFrameRate = 30

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
        this.topicServer.initChannels([fleetTopic, stageTopic])
        console.log(`✅ Fake bridge server running on port ${port}`)

        // Run update loop
        const timer = setInterval(() => {
            this.update(1/this.simulationFrameRate)
        }, 1000/this.simulationFrameRate)
    }

    /**
     * Updates the bot simulation
     * @param dt Time since last update
     */
    update(dt: number) {
        for (const botName in this.fleetState) {
            const botState = this.fleetState[botName];
            const targetPose = botState.targetPose;
            const botPose = botState.pose;
            const posDiff = [targetPose.position[0] - botPose.position[0], targetPose.position[1] - botPose.position[1], targetPose.position[2] - botPose.position[2]];
            const posDiffMag = Math.sqrt(posDiff[0] ** 2 + posDiff[1] ** 2 + posDiff[2] ** 2);
            if (posDiffMag > this.botPoseTolerance) {
                // Move the bot
                const newPos = [botPose.position[0] + posDiff[0] * this.botVelocity * dt, botPose.position[1] + posDiff[1] * this.botVelocity * dt, botPose.position[2] + posDiff[2] * this.botVelocity * dt];
                this.fleetState[botName].pose.position = newPos;
                this.fleetState[botName].status = "moving"
            } else {
                this.fleetState[botName].status = "idle"
            }
        }
        this.topicServer.pub(fleetTopic, this.fleetState);
    }
}