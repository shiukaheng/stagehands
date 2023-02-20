import { stageBoundary } from "../../../../schema/dist";
import { Context } from "../../controller/Context";
import { responseMessage } from "../../../../schema/dist"
import { ICommand } from "../ICommand";


export class SetStageBoundaryCommand implements ICommand{
    private stageBoundary:stageBoundary;
    constructor(stageBoundary : stageBoundary){
        this.stageBoundary = stageBoundary;
    }
    execute(context: Context): responseMessage {

        context.getStageState().boundary = this.stageBoundary;
        return{
            responseType:'success',
            message: 'stage boundary set'
        }

    }
    
}