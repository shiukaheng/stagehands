import { botPose, compositePose,botState} from "../../../../schema/src/bot/botState";
import { Context } from "../../controller/Context";
import { responseMessage } from "../../../../schema/src/serverResponse"
import { ICommand } from "../ICommand";

export class MoveBotToPoseCommand implements ICommand {
    private botPose:botPose;
    private botID:string;
    constructor(botID:string,botPose:botPose){
        this.botID = botID
        this.botPose = botPose;

    }
    execute(context: Context): responseMessage {
        let tempBotState=context.getTargetBotState().find(botState =>botState.name ===this.botID)
        if (tempBotState ===undefined){
            return {
                responseType:'error',
                message:`MoveBotToPoseCommand error: ${this.botID} not registered`
            }
        }
        

        if (tempBotState.status ==='error'){
            return {
                responseType:'error',
                message:`${this.botID} not functioning`
            }
        }
    
        //Might use mergediff
        tempBotState.pose=this.botPose
        return {
            responseType:'success',
            message:`${this.botID} move to ${JSON.stringify(this.botPose)}`
        }

        

    }

}