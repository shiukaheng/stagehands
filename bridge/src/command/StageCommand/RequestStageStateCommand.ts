import { Context } from "../../controller/Context";
import { responseMessage } from "../../utils/responseMessage";
import { ICommand } from "../ICommand";

export class RequestStageStateCommand implements ICommand{

    execute(context: Context): void | responseMessage {
        

        return{
            responseType :'success',
            message : 'Stage state sent',
            responseData : context.getStageState()
        }
    }
    
}