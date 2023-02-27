import { Pose, BotState } from "@schema/dist";
import { Context } from "../controller/Context";
import { recallFleetStateSchema,recallFleetStateService,RecallFleetState,recallBotStateService } from "@schema/dist";
import { ICommand } from "../command/ICommand";
import { IServiceHandler } from "../command/IServiceHandler";
import { Controller } from "../controller/Controller";

export async function RecallFleetStateServiceHandler(recallFleetState:RecallFleetState,context:Context):Promise<void>{
    const botIDs = Object.keys(recallFleetState);
    const errors = [];
    const botPromises=[];
    for (let i=0 ; i< botIDs.length;i++){
        let botId=botIDs[i]
        let botClientId = context.getbotClientIDMap().get(botId);
        let tempBotState = recallFleetState[botId];
        if(botClientId ===undefined){
            errors.push(`RecallFleetStateCommandError: ${botId} not connected to the server`)
        }
        else{
            botPromises.push(Controller.getInstance().server.req(recallBotStateService ,botClientId,tempBotState));
        }
        
    }
    Promise.all(botPromises).catch((error) =>
        errors.push(error)
        )
    throw new AggregateError(errors);
}