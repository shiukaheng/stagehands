import { Context } from "../../controller/Context";
import { responseMessage } from "../../../../schema/src/serverResponse"
import { ICommand } from "../ICommand";

export class RequestStageStateCommand implements ICommand{

    execute(context: Context): responseMessage {
        

        return{
            responseType :'success',
            message : 'Stage state sent',
            responseData : context.getStageState()
        }
    }
    
}