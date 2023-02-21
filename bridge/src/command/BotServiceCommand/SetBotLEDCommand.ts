import { LEDState } from "../../../../schema/dist";
import { Context } from "../../controller/Context";
import { ResponseMessage } from "../../../../schema/dist"
import { ICommand } from "../ICommand";

export class SetBotLEDCommand implements ICommand{
    private botID:string;
    private LEDState :LEDState
    execute(context: Context):  ResponseMessage {
        let tempBotState=context.getTargetBotState().find((botState: { name: string; }) =>botState.name ===this.botID)
        if (tempBotState ===undefined){
            return {
                responseType:'error',
                message:`setBotLEDCommand error :${this.botID} not registered`
            }
        }
        
        return{

            responseType:'success',
            message:`LED set for ${this.botID}`
        }
        
        
    }
    constructor(botID:string,LEDState:LEDState){
        this.LEDState = LEDState
        this.botID = botID
    }

    

}