import { Context } from "./controller/Context";
import {UpdatePresetRequest, RecallFleetState, recallBotStateService, stopService, clearStopService, LEDState, OverWriteBotLEDRequest, LEDOverwriteService, restoreLEDService, Preset, stageTopic } from "schema";
import { v4 } from "uuid"
import { checkClientIDPresent, checkValidRecall } from "./utils/validationFunc";
import { Controller } from "./controller/Controller";


//Create preset
export function CreatePresetServiceHandler(preset:Preset,context:Context):string {

    checkValidRecall(preset.state,context);
    const presetID = v4();
    context.getStageState().presets.push({id:presetID,value:preset});
    Controller.getInstance().server.pub(stageTopic,context.getStageState())
    return "created";
}

 // Delete preset
export function DeletePresetServiceHandler(presetID:string,context:Context):void {
    context.getStageState().presets.filter(preset=>preset.id!==presetID);
    Controller.getInstance().server.pub(stageTopic,context.getStageState())
}

   // Update preset
export function UpdatePresetServiceHandler(updatePresetRequest:UpdatePresetRequest,context:Context):void {
    checkValidRecall(updatePresetRequest.preset.state,context);
    context.getStageState().presets.map(preset=>preset.id===updatePresetRequest.presetId ?updatePresetRequest.preset:preset);
    Controller.getInstance().server.pub(stageTopic,context.getStageState())
}


 // Emergency stop
export function EmergencyStopServiceHandler(context:Context){
    const errors = [];
    for (const botName in context.getTargetBotState()) {
        try{
            StopBotServiceHandler(botName,context);
        }
        catch(error){
            errors.push(error);
        }
    }
    throw new AggregateError(errors);
}


 // Clear emergency stop
export function EmergencyStopClearServiceHandler(context:Context){
    const errors = [];
    for (const botName in context.getTargetBotState()) {
        try{
            StopBotClearServiceHandler(botName,context);
        }
        catch(error){
            errors.push(error);
        }
    }
    throw new AggregateError(errors);
}

// Stop particular bot
export async function StopBotServiceHandler(botName:string,context:Context){
    if (!context.getCurrentBotState().hasOwnProperty(botName)) {
        throw new Error(`Bot ${botName} does not exist`)
    }
    try{
        checkClientIDPresent(botName,context);
        const botClientID = context.getbotClientIDMap().get(botName);
        Controller.getInstance().server.req(stopService,botClientID as string)
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
export async function StopBotClearServiceHandler(botName:string,context:Context){
    if (!context.getCurrentBotState().hasOwnProperty(botName)) {
        throw new Error(`Bot ${botName} does not exist`)
    }
    try{
        checkClientIDPresent(botName,context);
        const botClientID = context.getbotClientIDMap().get(botName);
        Controller.getInstance().server.req(clearStopService,botClientID as string)
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
export async function RecallFleetStateServiceHandler(recallFleetState:RecallFleetState,context:Context):Promise<void>{
    const errors = [];
    
    for (const [botName, recallBotState] of Object.entries(recallFleetState)){
        let botClientId = context.getbotClientIDMap().get(botName);
        try{
            checkValidRecall(recallFleetState,context)
            checkClientIDPresent(botName,context);
            Controller.getInstance().server.req(recallBotStateService ,botClientId as string,recallBotState)
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
    
    throw new AggregateError(errors);
}


//Overwrite particular bot LED

export async function overWriteBotLEDServiceHandler(overWriteBotLEDRequest:OverWriteBotLEDRequest,context:Context){
    const botID = overWriteBotLEDRequest.botID;
    if (!context.getTargetBotState().hasOwnProperty(botID)) {
        throw new Error(`Bot ${botID} does not exist`)
    }
    try{
        checkClientIDPresent(botID,context);
        const botClientID = context.getbotClientIDMap().get(botID);
        Controller.getInstance().server.req(LEDOverwriteService,botClientID as string)
        .then(()=>{
            const bot = context.getTargetBotState()[botID];
            bot.ledState.systemOverride = overWriteBotLEDRequest.ledState;
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
export async function overWriteLEDServiceHandler(LEDState:LEDState,context:Context){
    const errors = [];
    for (const botID in context.getTargetBotState()) {
        try{
            const overWriteBotLEDRequest = {botID:botID,ledState:LEDState};
            overWriteBotLEDServiceHandler(overWriteBotLEDRequest,context);
        }
        catch(error){
            errors.push(error);
        }
    }
    throw new AggregateError(errors);
}

//clear particular bot's LED overwrite

export async function clearBotLEDOverwriteServiceHandler(botID:string,context:Context){
    if (!context.getTargetBotState().hasOwnProperty(botID)) {
        throw new Error(`Bot ${botID} does not exist`)
    }
    try{
        checkClientIDPresent(botID,context);
        const botClientID = context.getbotClientIDMap().get(botID);
        Controller.getInstance().server.req(restoreLEDService,botClientID as string)
        .then(()=>{
            const bot = context.getTargetBotState()[botID];
            bot.ledState.systemOverride = undefined;
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

export async function clearLEDOverwriteServiceHandler(context:Context){
    const errors = [];
    for (const botID in context.getTargetBotState()) {
        try{
            clearBotLEDOverwriteServiceHandler(botID,context);
        }
        catch(error){
            errors.push(error);
        }
    }
    throw new AggregateError(errors);
}

//Run preset
export function runPresetServiceHandler(presetID:string,context:Context){
    const preset = context.getStageState().presets.find(preset => preset.id === presetID)
    if (!preset) {
        throw new Error("Preset does not exist")
    }
    context.getStageState().activePreset=presetID
    RecallFleetStateServiceHandler(preset.value.state,context)
    Controller.getInstance().server.pub(stageTopic,context.getStageState())
}

//Reorder preset
export function reorderPresetsServiceHandler(presetIDs:string[],context:Context){
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
        Controller.getInstance().server.pub(stageTopic,context.getStageState())
        console.log("Reordered presets")
}
}


