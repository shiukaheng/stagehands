import { Context } from "../../controller/Context";
import { responseMessage } from "../../../../schema/dist"
import { ICommand } from "../ICommand";

export class StopAllBotCommand implements ICommand{
    execute(context: Context):  responseMessage {
        
        context.getTargetBotState().forEach(botState => {
            botState.status='stopped'
        });

        return{
            responseType:'success',
            message:'stopping all bots'
        }
    }
}