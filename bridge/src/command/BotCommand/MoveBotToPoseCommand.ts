import { botPose, compositePose,botState} from "../../../../schema/src/bot/botState";
import { Context } from "../../controller/Context";
import { responseMessage } from "../../utils/responseMessage";
import { ICommand } from "../ICommand";

export class MoveBotToPoseCommand implements ICommand {
    private botPose:botPose;
    private botID:string;
    constructor(botID:string,botPose:botPose){
        this.botID = botID
        this.botPose = botPose;

    }
    execute(context: Context): responseMessage {
        let tempBotState=context.getAggregatedBotState().find(botState =>botState.name ===this.botID)
        if (tempBotState ===undefined){
            return {
                responseType:'error',
                message:`${this.botID} not registered`
            }
        }
        

        if (tempBotState.status ==='error'){
            return {
                responseType:'error',
                message:`${this.botID} not functioning`
            }
        }
        else{
            
            return {
                responseType:'success',
                message:`${this.botID} move to ${JSON.stringify(this.botPose)}`
            }

        }

    }

}