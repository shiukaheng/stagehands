import { Context } from "../../controller/Context";
import { responseMessage } from "../../../../schema";
import { ICommand } from "../ICommand";


export abstract class StateChangeCommand<T> implements ICommand{
    private newState:T ;

    constructor(newState:T){
        
        this.newState=newState;
    }
    execute(context: Context): { responseData?: any; responseType: string; message: string; } {
        throw new Error("Method not implemented.");
    }
    

}