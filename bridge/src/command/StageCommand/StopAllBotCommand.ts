import { Context } from "../../controller/Context";
import { responseMessage } from "../../utils/responseMessage";
import { ICommand } from "../ICommand";

export class StopAllBotCommand implements ICommand{
    execute(context: Context): void | responseMessage {
        
        context.getTargetBotState().forEach(botState => {
            botState.status='stopped'
        });

        return{
            responseType:'success',
            message:'stopping all bots'
        }
    }
}