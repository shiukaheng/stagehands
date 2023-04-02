import { TopicServer } from "webtopics"
import { Server } from "socket.io"
import { FleetState, PresetSet, StageState, createPresetService, deletePresetService, emergencyStopClearService, emergencyStopService, fleetTopic, recallBotStateService, recallFleetStateService, stageTopic, stopBotClearService, updatePresetService, runPresetService, reorderPresetsService, Preset, BotConnectionState, connectBotService, disconnectBotService, botConnectionStatusTopic } from "schema"
import { createNewBotState } from "./utils"
import { z } from "zod"
import { ServiceChannel } from "webtopics/dist/utils/Channel"
import { v4 } from "uuid"

export class FakeBridgeServer {
    // Initialize variables
    private ts: TopicServer
    private io: Server
    private fleetState: FleetState = {
        "1": createNewBotState({name: "Alice" , module : {type: "micStand", 
        state: {gripPosition : 10, gripAngle: 0}, moduleModels: {"1" : {modelID : "1", pose :{ position : [0,0,0], quaternion :[0,0,0,1]}} }}}), // 
        "2" : createNewBotState({name: "Bob"}),
        "3" : createNewBotState({name: "Charlie"}),
        "4" : createNewBotState({name: "Daisy"}),
    }
    private botConnectionState:BotConnectionState={"Alice":"disconnected","Bob":"disconnected","Charlie":"disconnected","Daisy":"disconnected"}

    private activeFleetState:FleetState={}
    private stageState: StageState = {
        boundary: {
            polygonVertexCoordinates: []
        },
        presets: [],
        activePreset: null,
        presetRecallState: "idle"
    }
    private botVelocity = 0.1
    private botPoseTolerance = 0.01
    private simulationFrameRate = 60
    private botRotationSpeed = 60/180 * Math.PI
    private botRotationTolerance = 1/180 * Math.PI

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
        this.ts = new TopicServer(this.io, {
            // logTopics: true,
            // logServices: true,
        })
        this.ts.pub(fleetTopic, this.fleetState)
        this.ts.pub(stageTopic, this.stageState)
        this.ts.pub(botConnectionStatusTopic,this.botConnectionState)
        console.log(`✅ Fake bridge server running on port ${port}`)

        // Run update loop
        
        const timer = setInterval(() => {
            this.update(1/this.simulationFrameRate)
        }, 1000/this.simulationFrameRate)

        // this.ts.sub(stageTopic, (newStageState) => {
        //     console.log("Changing stage state:", newStageState)
        // })

        // Services

        // Recall fleet state
        this.ts.srv(recallFleetStateService, (newFleetState)=>{
            // Check if all bots exist
            this.checkValidRecall(newFleetState)
            // Update the fleet state
            for (const [botName, recallBotState] of Object.entries(newFleetState)) {
                const bot = this.activeFleetState[botName]
                bot.name = recallBotState.name
                bot.targetPose = recallBotState.targetPose
                bot.module.state = recallBotState.module.state
                bot.ledState.base = recallBotState.baseLEDState
            }
            this.ts.pub(fleetTopic, this.activeFleetState)
            console.log("Recalled fleet state")
        })

        // Create preset
        this.ts.srv(createPresetService, (presetFleetState) => {
            this.checkValidRecall(presetFleetState.state)
            const presetID = v4()
            // this.stageState.presets.push({
            //     id: presetID,
            //     value: presetFleetState
            // }) - BUG! This should work. Perhaps bug in webtopics that used shallow comparison where it should have used deep comparison?
            this.stageState.presets = [
                ...this.stageState.presets,
                {
                    id: presetID,
                    value: presetFleetState
                }
            ]
            this.ts.pub(stageTopic, this.stageState)
            console.log("Created preset", presetID)
            return presetID
        })

        // Update preset
        this.ts.srv(updatePresetService, (updatePresetRequest) => {
            this.checkValidRecall(updatePresetRequest.preset.state)
            // this.stageState.presets[updatePresetRequest.presetId] = updatePresetRequest.preset
            const presetIndex = this.stageState.presets.findIndex(preset => preset.id === updatePresetRequest.presetId)
            if (presetIndex === -1) {
                throw new Error("Preset does not exist")
            }
            this.stageState.presets[presetIndex].value = updatePresetRequest.preset
            this.ts.pub(stageTopic, this.stageState)
            console.log("Updated preset", updatePresetRequest.presetId)
        })

        // Delete preset
        this.ts.srv(deletePresetService, (presetID) => {
            console.log("Deleting preset", presetID);
            // this.stageState.presets = Object.fromEntries(Object.entries(this.stageState.presets).filter(([id, _]) => id !== presetID))
            this.stageState.presets = this.stageState.presets.filter(preset => preset.id !== presetID)
            this.ts.pub(stageTopic, this.stageState, true, true)
        })

        // Running a preset
        this.ts.srv(runPresetService, (presetID) => {
            console.log("Running preset", presetID);
            this.stageState.activePreset = presetID; 
            // const preset = this.stageState.presets[presetID];
            const preset = this.stageState.presets.find(preset => preset.id === presetID)
            if (!preset) {
                throw new Error("Preset does not exist")
            }
            preset?.value?.state && Object.entries(preset?.value?.state).map(([key, value]) => (
                preset.value.state[key].name = this.fleetState[key].name
            ))
            this.ts.req(recallFleetStateService, this.ts.id, preset.value.state)
        })

        // Reorder presets
        this.ts.srv(reorderPresetsService, (presetIDs) => {
            // Check if the list of prest IDs match the current list of presets using sets
            const currentSet = new Set(this.stageState.presets.map(preset => preset.id))
            if (presetIDs.length !== currentSet.size || !presetIDs.every(id => currentSet.has(id))) {
                throw new Error("Invalid preset ID list")
            } else {
                // Reorder the presets
                const newPresets: {id: string, value: Preset}[] = []
                for (const id of presetIDs) {
                    const preset = this.stageState.presets.find(preset => preset.id === id)
                    if (preset) {
                        newPresets.push(preset)
                    } else {
                        throw new Error("Preset does not exist")
                    }
                }
                this.stageState.presets = newPresets
                this.ts.pub(stageTopic, this.stageState)
                console.log("Reordered presets")
            }
        })

        // Emergency stop
        this.ts.srv(emergencyStopService, ()=>{
            for (const botName in this.fleetState) {
                this.fleetState[botName].stopped = true
            }
            this.ts.pub(fleetTopic, this.fleetState)
            console.log("Emergency stopped")
        })

        // Clear emergency stop
        this.ts.srv(emergencyStopClearService, ()=>{
            for (const botName in this.fleetState) {
                this.fleetState[botName].stopped = false
            }
            this.ts.pub(fleetTopic, this.fleetState)
            console.log("Cleared emergency stop")
        })

        // Stop particular bot
        this.ts.srv(stopBotClearService, (botName)=>{
            // Check if bot exists
            if (!this.fleetState.hasOwnProperty(botName)) {
                throw new Error(`Bot ${botName} does not exist`)
            } else {
                this.fleetState[botName].stopped = true
            }
            this.ts.pub(fleetTopic, this.fleetState)
            console.log(`Stopped bot ${botName}`)
        })

        // Recall bot state
        this.ts.srv(stopBotClearService, (botName)=>{
            // Check if bot exists
            if (!this.fleetState.hasOwnProperty(botName)) {
                throw new Error(`Bot ${botName} does not exist`)
            } else {
                this.fleetState[botName].stopped = true
            }
            this.ts.pub(fleetTopic, this.fleetState)
            console.log(`Stopped bot ${botName}`)
        })

        this.ts.srv(connectBotService,(botName)=>{
            const botConnectionStatus=this.botConnectionState[botName]
            if(botConnectionStatus==="connected"){
                throw new Error("Bot is already connected");
            }
            this.botConnectionState[botName]="connected"
            this.ts.pub(botConnectionStatusTopic,this.botConnectionState)
        })
        this.ts.srv(disconnectBotService,(botName)=>{
            const botConnectionStatus=this.botConnectionState[botName]
            if(botConnectionStatus==="disconnected"){
                throw new Error("Bot is already disconnected");
            }
            this.botConnectionState[botName]="disconnected"
            this.ts.pub(botConnectionStatusTopic,this.botConnectionState)
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
            if (botState.stopped !== true ) {
                const targetPose = botState.targetPose;
                const botPose = botState.pose;
                const posDiff = [targetPose.position[0] - botPose.position[0], targetPose.position[1] - botPose.position[1], targetPose.position[2] - botPose.position[2]];
                const posDiffMag = Math.sqrt(posDiff[0] ** 2 + posDiff[1] ** 2 + posDiff[2] ** 2);
                const posDirection = posDiff.map((val)=>{
                    if(Math.abs(val)<this.botPoseTolerance){return 0}else{
                    if(val<0){return -1}else{
                        return 1
                    }}})
                if (posDiffMag > this.botPoseTolerance) {
                    // Move the bot
                    const newPos = [botPose.position[0] + posDirection[0]* 20 *this.botVelocity * dt, botPose.position[1] , botPose.position[2] + posDirection[2]*20* this.botVelocity * dt];
                    this.fleetState[botName].pose.position = newPos;
                    this.fleetState[botName].status = "moving"
                } else {
                    const botQuaternion = botState.pose.quaternion;
                    const quatDiff = targetPose.quaternion[0] - botQuaternion[0];
                    const quatDiffMag = Math.abs(quatDiff);
                    const rotateDirection = quatDiff<0?-1:1
                    if(quatDiffMag>this.botRotationTolerance){
                        const newQuaternion = [botQuaternion[0] + rotateDirection* this.botRotationSpeed * dt, botQuaternion[1], botQuaternion[2], botQuaternion[3]];
                        this.fleetState[botName].status = "moving"
                        this.fleetState[botName].pose.quaternion = newQuaternion;
                    } else {
                    this.fleetState[botName].status = "idle"
                    }

                }
                
                
            }
        }
        for(const botID of Object.keys(this.fleetState)){
            const botName=this.fleetState[botID].name
            if(this.botConnectionState[botName]==="connected"){
                this.activeFleetState[botID]=this.fleetState[botID]
            }
            else{
                delete this.activeFleetState[botID]
            }
        }
        this.ts.pub(fleetTopic, this.activeFleetState);
    }
    
}
