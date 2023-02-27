import { Context } from "./controller/Context";
import {UpdatePresetRequest, RecallFleetState, recallBotStateService } from "@schema/dist";
import { v4 } from "uuid"
import { checkClientIDPresent, checkValidRecall } from "./utils/validationFunc";
import { Controller } from "./controller/Controller";


//Create preset
export function CreatePresetServiceHandler(presetFleetState:RecallFleetState,context:Context):boolean {

    checkValidRecall(presetFleetState,context);
    const presetID = v4();
    context.getStageState().presets[presetID] = {name:presetID,state:presetFleetState}
    return true;
}

 // Delete preset
export function DeletePresetServiceHandler(presetID:string,context:Context):void {
    delete context.getStageState().presets[presetID];
}

   // Update preset
export function UpdatePresetServiceHandler(updatePresetRequest:UpdatePresetRequest,context:Context):void {
    checkValidRecall(updatePresetRequest.preset.state,context);
    context.getStageState().presets[updatePresetRequest.presetId] = updatePresetRequest.preset;
}


 // Emergency stop
export function EmergencyStopServiceHandler(context:Context){
    for (const botName in context.getTargetBotState) {
        context.getTargetBotState()[botName].stopped = true;
    }
}


 // Clear emergency stop
export function EmergencyStopClearServiceHandler(context:Context){
    for (const botName in context.getTargetBotState) {
        context.getTargetBotState()[botName].stopped = false;
    }
}

// Stop particular bot
export function StopBotClearServiceHandler(botName:string,context:Context){

    if (!context.getCurrentBotState().hasOwnProperty(botName)) {
        throw new Error(`Bot ${botName} does not exist`)
    } else {
        context.getTargetBotState()[botName].stopped = true
    }
}
// Recall fleet state
export async function RecallFleetStateServiceHandler(recallFleetState:RecallFleetState,context:Context):Promise<void>{
    const botIDs = Object.keys(recallFleetState);
    const errors = [];
    const botPromises=[];

    for (const [botName, recallBotState] of Object.entries(recallFleetState)){
        let botClientId = context.getbotClientIDMap().get(botName);
        try{
            checkValidRecall(recallFleetState,context)
            checkClientIDPresent(botName,context);
            Controller.getInstance().server.req(recallBotStateService ,botClientId as string,recallBotState)
            .then(()=>{
                const bot = context.getTargetBotState()[botName];
                bot.targetPose = recallBotState.targetPose;
                bot.module.state = recallBotState.module.state;
                bot.ledState.base = recallBotState.baseLEDState;
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