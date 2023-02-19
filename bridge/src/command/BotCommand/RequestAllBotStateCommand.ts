import { Context } from "../../controller/Context";
import { responseMessage } from "../../../../schema/src/serverResponse"
import { ICommand } from "../ICommand";

export class RequestAllBotStateCommand implements ICommand{

    execute(context: Context):  responseMessage {
        
        return {
            responseType :'success',
            message : 'All bot states sent',
            responseData : context.getCurrentBotState()
        }

    
}
}