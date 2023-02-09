import { Context } from "../../controller/Context";
import { responseMessage } from "../../utils/responseMessage";
import { ICommand } from "../ICommand";

export class RequestAllBotStateCommand implements ICommand{

    execute(context: Context): void | responseMessage {
        
        return {
            responseType :'success',
            message : 'All bot states sent',
            responseData : context.getCurrentBotState()
        }

    
}
}