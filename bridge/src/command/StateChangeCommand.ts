import { Context } from "../controller/Context";
import { responseMessage } from "../utils/responseMessage";
import { ICommand } from "./ICommand";

export abstract class StateChangeCommand<T> implements ICommand{
    private newState:T ;

    constructor(newState:T){
        
        this.newState=newState;
    }
    execute(context: Context): responseMessage {
        return null as any;
    }
    applyStateChange(context:Context,newState:T){
        //diff(newState,context)
        //mergeDiff(context,diff)
    }

}