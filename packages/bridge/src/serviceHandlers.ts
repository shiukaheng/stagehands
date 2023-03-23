import { Context } from "./controller/Context";
import {UpdatePresetRequest, RecallFleetState, recallBotStateService, stopService, clearStopService, LEDState, OverWriteBotLEDRequest, LEDOverwriteService, restoreLEDService, Preset, stageTopic, RegisterBotClientIDRequest, CreatePresetReturn } from "schema";
import { v4 } from "uuid"
import { checkClientIDPresent, checkValidRecall } from "./utils/ValidationFunc";
import { Controller } from "./controller/Controller";
import { TopicServer } from "webtopics";


//Create preset
export function CreatePresetServiceHandler(preset:Preset,context:Context,server:TopicServer):string {

    checkValidRecall(preset.state,context);
    const presetID = v4();
    context.getStageState().presets=[
        ...context.getStageState().presets,
        {
            id: presetID,
            value: preset
        }
    ];

    server.pub(stageTopic,context.getStageState())
    return "created" as CreatePresetReturn;
}

 // Delete preset
export function DeletePresetServiceHandler(presetID:string,context:Context,server:TopicServer):void {
    context.getStageState().presets=context.getStageState().presets.filter(preset=>preset.id!==presetID);
    server.pub(stageTopic,context.getStageState())
}

   // Update preset
export function UpdatePresetServiceHandler(updatePresetRequest:UpdatePresetRequest,context:Context,server:TopicServer):void {
    checkValidRecall(updatePresetRequest.preset.state,context);
    const presetIndex = context.getStageState().presets.findIndex(preset => preset.id === updatePresetRequest.presetId)
    if (presetIndex === -1) {
        throw new Error("Preset does not exist")
    }
    context.getStageState().presets[presetIndex].value = updatePresetRequest.preset
    server.pub(stageTopic,context.getStageState())
}


 // Emergency stop
export function EmergencyStopServiceHandler(requestData:undefined,context:Context,server:TopicServer){
    const errors = [];
    for (const botName in context.getCurrentBotState()) {
        try{
            StopBotServiceHandler(botName,context,server);
        }
        catch(error){
            errors.push(error);
        }
    }
    throw new AggregateError(errors);
}


 // Clear emergency stop
export function EmergencyStopClearServiceHandler(requestData:undefined,context:Context,server:TopicServer){
    const errors = [];
    for (const botName in context.getCurrentBotState()) {
        try{
            StopBotClearServiceHandler(botName,context,server);
        }
        catch(error){
            errors.push(error);
        }
    }
    throw new AggregateError(errors);
}

// Stop particular bot
export async function StopBotServiceHandler(botName:string,context:Context,server:TopicServer){
    if (!context.getCurrentBotState().hasOwnProperty(botName)) {
        throw new Error(`Bot ${botName} does not exist`)
    }
    try{
        checkClientIDPresent(botName,context);
        const botClientID = context.getbotClientIDMap().get(botName);
        server.req(stopService,botClientID as string)
        .then(()=>{
            //context.getTargetBotState()[botName].stopped = true;
        })
        .catch((error)=>{
            throw error;
        })
    }
    catch(error){
        throw error;
    }
    
}

// Clear bot stop
export async function StopBotClearServiceHandler(botName:string,context:Context,server:TopicServer){
    if (!context.getCurrentBotState().hasOwnProperty(botName)) {
        throw new Error(`Bot ${botName} does not exist`)
    }
    try{
        checkClientIDPresent(botName,context);
        const botClientID = context.getbotClientIDMap().get(botName);
        server.req(clearStopService,botClientID as string)
        .then(()=>{
            //context.getTargetBotState()[botName].stopped = false;
        })
        .catch((error)=>{
            throw error;
        })
    }
    catch(error){
        throw error;
    }
    
}

// Recall fleet state
export async function RecallFleetStateServiceHandler(recallFleetState:RecallFleetState,context:Context,server:TopicServer){
    const errors = [];
    
    for (const [botName, recallBotState] of Object.entries(recallFleetState)){
        let botClientId = context.getbotClientIDMap().get(botName);
        try{
            checkValidRecall(recallFleetState,context)
            checkClientIDPresent(botName,context);
            server.req(recallBotStateService ,botClientId as string,recallBotState)
            .then(()=>{
                // const bot = context.getTargetBotState()[botName];
                // bot.targetPose = recallBotState.targetPose;
                // bot.module.state = recallBotState.module.state;
                // bot.ledState.base = recallBotState.baseLEDState;
            })
            .catch((error)=>{
                errors.push(error)
            })
        }
        catch(error){
            errors.push(error);
        }
        
    }
    if(errors.length!==0){
        throw new AggregateError(errors);
    }
    
}


//Overwrite particular bot LED

export async function overWriteBotLEDServiceHandler(overWriteBotLEDRequest:OverWriteBotLEDRequest,context:Context,server:TopicServer){
    const botID = overWriteBotLEDRequest.botID;
    if (!context.getCurrentBotState().hasOwnProperty(botID)) {
        throw new Error(`Bot ${botID} does not exist`)
    }
    try{
        checkClientIDPresent(botID,context);
        const botClientID = context.getbotClientIDMap().get(botID);
        server.req(LEDOverwriteService,botClientID as string,overWriteBotLEDRequest.ledState)
        .then(()=>{
            // const bot = context.getCurrentBotState()[botID];
            // bot.ledState.systemOverride = overWriteBotLEDRequest.ledState;
        })
        .catch((error)=>{
            throw error;
        })
    }
    catch(error){
        throw error;
    }
}

//Overwrite all bot LEDs
export async function overWriteLEDServiceHandler(LEDState:LEDState,context:Context,server:TopicServer){
    const errors = [];
    for (const botID in context.getCurrentBotState()) {
        try{
            const overWriteBotLEDRequest = {botID:botID,ledState:LEDState};
            overWriteBotLEDServiceHandler(overWriteBotLEDRequest,context,server);
        }
        catch(error){
            errors.push(error);
        }
    }
    throw new AggregateError(errors);
}

//clear particular bot's LED overwrite

export async function clearBotLEDOverwriteServiceHandler(botID:string,context:Context,server:TopicServer){
    if (!context.getCurrentBotState().hasOwnProperty(botID)) {
        throw new Error(`Bot ${botID} does not exist`)
    }
    try{
        checkClientIDPresent(botID,context);
        const botClientID = context.getbotClientIDMap().get(botID);
        server.req(restoreLEDService,botClientID as string)
        .then(()=>{
            // const bot = context.getCurrentBotState()[botID];
            // bot.ledState.systemOverride = undefined;
        })
        .catch((error)=>{
            throw error;
        })
    }
    catch(error){
        throw error;
    }
}

//clear all bot's LED overwrite

export async function clearLEDOverwriteServiceHandler(requestData:undefined,context:Context,server:TopicServer){
    const errors = [];
    for (const botID in context.getCurrentBotState()) {
        try{
            clearBotLEDOverwriteServiceHandler(botID,context,server);
        }
        catch(error){
            errors.push(error);
        }
    }
    throw new AggregateError(errors);
}

//Run preset
export function runPresetServiceHandler(presetID:string,context:Context,server:TopicServer){
    const preset = context.getStageState().presets.find(preset => preset.id === presetID)
    if (!preset) {
        throw new Error("Preset does not exist")
    }
    context.getStageState().activePreset=presetID
    RecallFleetStateServiceHandler(preset.value.state,context,server)
    server.pub(stageTopic,context.getStageState())
}

//Reorder preset
export function reorderPresetsServiceHandler(presetIDs:string[],context:Context,server:TopicServer){
    const currentSet = new Set(context.getStageState().presets.map(preset => preset.id))
    if (presetIDs.length !== currentSet.size || !presetIDs.every(id => currentSet.has(id))) {
        throw new Error("Invalid preset ID list")
    } else {
        // Reorder the presets
        const newPresets: {id: string, value: Preset}[] = []
        for (const id of presetIDs) {
            const preset = context.getStageState().presets.find(preset => preset.id === id)
            if (preset) {
                newPresets.push(preset)
            } else {
                throw new Error("Preset does not exist")
            }
        }
        context.getStageState().presets = newPresets
        server.pub(stageTopic,context.getStageState())
        console.log("Reordered presets")
}

}
//register bot clientID
export function registerBotClientIDServiceHandler(registerBotClientIDRequest:RegisterBotClientIDRequest,context:Context){
    context.getbotClientIDMap().set(registerBotClientIDRequest.botID,registerBotClientIDRequest.clientID);
}

