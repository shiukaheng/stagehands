import { Context } from "../../controller/Context";
import { responseMessage } from "../../../../schema/dist"
import { ICommand } from "../ICommand";

export class RequestBotStateCommand implements ICommand{

    private botID:string
    execute(context: Context): responseMessage {
        let tempBotState=context.getCurrentBotState().find(botState =>botState.name ===this.botID)
        if (tempBotState ===undefined){
            return {
                responseType:'error',
                message:`RequestBotStateCommand error: ${this.botID} not registered`
            }
        }


        return {
            responseType :'success',
            message : `bot with ID ${this.botID} state sent`,
            responseData : tempBotState
        }

    }
    constructor(botID:string){
        this.botID = botID;

    }
}