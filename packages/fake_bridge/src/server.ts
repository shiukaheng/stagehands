import { TopicServer } from "webtopics"
import { Server } from "socket.io"
import { FleetState, PresetSet, StageState, createPresetService, deletePresetService, emergencyStopClearService, emergencyStopService, fleetTopic, recallBotStateService, recallFleetStateService, stageTopic, stopBotClearService, updatePresetService } from "schema"
import { createNewBotState } from "./utils"
import { z } from "zod"
import { ServiceChannel } from "webtopics/dist/utils/Channel"
import { v4 } from "uuid"

export class FakeBridgeServer {
    // Initialize variables
    private ts: TopicServer
    private io: Server
    private fleetState: FleetState = {
        "1": createNewBotState({name: "Alice"}),
    }
    private stageState: StageState = {
        boundary: {
            polygonVertexCoordinates: []
        },
        presets: {},
        activePreset: null,
        presetRecallState: "idle"
    }
    private botVelocity = 0.1
    private botPoseTolerance = 0.01
    private simulationFrameRate = 60

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
        this.ts = new TopicServer(this.io)
        this.ts.pub(fleetTopic, this.fleetState)
        this.ts.pub(stageTopic, this.stageState)
        console.log(`✅ Fake bridge server running on port ${port}`)

        // Run update loop
        const timer = setInterval(() => {
            this.update(1/this.simulationFrameRate)
        }, 1000/this.simulationFrameRate)

        // Services

        // Recall fleet state
        this.ts.srv(recallFleetStateService, (newFleetState)=>{
            // Check if all bots exist
            this.checkValidRecall(newFleetState)
            // Update the fleet state
            for (const [botName, recallBotState] of Object.entries(newFleetState)) {
                const bot = this.fleetState[botName]
                bot.targetPose = recallBotState.targetPose
                bot.module.state = recallBotState.module.state
                bot.ledState.base = recallBotState.baseLEDState
            }
        })

        // Create preset
        this.ts.srv(createPresetService, (presetFleetState) => {
            this.checkValidRecall(presetFleetState.state)
            const presetID = v4()
            this.stageState.presets[presetID] = presetFleetState
            return presetID
        })

        // Update preset
        this.ts.srv(updatePresetService, (updatePresetRequest) => {
            this.checkValidRecall(updatePresetRequest.preset.state)
            this.stageState.presets[updatePresetRequest.presetId] = updatePresetRequest.preset
        })

        // Delete preset
        this.ts.srv(deletePresetService, (presetID) => {
            delete this.stageState.presets[presetID]
        })

        // Emergency stop
        this.ts.srv(emergencyStopService, ()=>{
            for (const botName in this.fleetState) {
                this.fleetState[botName].stopped = true
            }
        })

        // Clear emergency stop
        this.ts.srv(emergencyStopClearService, ()=>{
            for (const botName in this.fleetState) {
                this.fleetState[botName].stopped = false
            }
        })

        // Stop particular bot
        this.ts.srv(stopBotClearService, (botName)=>{
            // Check if bot exists
            if (!this.fleetState.hasOwnProperty(botName)) {
                throw new Error(`Bot ${botName} does not exist`)
            } else {
                this.fleetState[botName].stopped = true
            }
        })

        // Recall bot state
        this.ts.srv(stopBotClearService, (botName)=>{
            // Check if bot exists
            if (!this.fleetState.hasOwnProperty(botName)) {
                throw new Error(`Bot ${botName} does not exist`)
            } else {
                this.fleetState[botName].stopped = true
            }
        })

        // // Every 5 seconds, randomize each bot's target pose in x and z
        // setInterval(() => {
        //     // console.log("Randomizing target poses")
        //     for (const botName in this.fleetState) {
        //         const botState = this.fleetState[botName]
        //         const targetPose = botState.targetPose
        //         targetPose.position[0] = (Math.random() * 2 - 1) * 20
        //         targetPose.position[2] = (Math.random() * 2 - 1) * 20
        //     }
        //     // console.log(this.fleetState)
        // }, 5000)
    }

    private checkValidRecall(newFleetState: Record<string, { module: { type: string; state: { gripPosition: number } | null }; targetPose: { position: number[]; quaternion: number[] }; baseLEDState: { rgbValue: number[]; ledAnimation: { flashingFrequency?: number | undefined; animationMode: "constant" | "flashing" } } }>) {
        for (const botName in newFleetState) {
            if (!this.fleetState.hasOwnProperty(botName)) {
                throw new Error(`Bot ${botName} does not exist`)
            } else {
                // Check if the modules match
                const botState = this.fleetState[botName]
                if (botState.module.type !== newFleetState[botName].module.type) {
                    throw new Error(`Bot ${botName} has module type ${botState.module.type} but the state has module type ${newFleetState[botName].module.type}`)
                }
            }
        }
    }

    /**
     * Updates the bot simulation
     * @param dt Time since last update
     */
    update(dt: number) {
        for (const botName in this.fleetState) {
            const botState = this.fleetState[botName];
            if (botState.stopped !== true) {
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
        }
        this.ts.pub(fleetTopic, this.fleetState);
    }
}