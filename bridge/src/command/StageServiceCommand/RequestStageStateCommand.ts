import { Context } from "../../controller/Context";
import { responseMessage } from "../../../../schema/dist"
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