import { StageBoundary } from "../../../../schema/dist";
import { Context } from "../../controller/Context";
import { ResponseMessage } from "../../../../schema/dist"
import { ICommand } from "../ICommand";


export class SetStageBoundaryCommand implements ICommand{
    private stageBoundary: StageBoundary;
    constructor(stageBoundary : StageBoundary){
        this.stageBoundary = stageBoundary;
    }
    execute(context: Context): ResponseMessage {

        context.getStageState().boundary = this.stageBoundary;
        return{
            responseType:'success',
            message: 'stage boundary set'
        }

    }
    
}