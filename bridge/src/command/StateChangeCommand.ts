import { Context } from "../controller/Context";
import { ICommand } from "./ICommand";

export class StateChangeCommand<T> implements ICommand{
    private diff:T ;

    constructor(diif:T){
        this.diff=diif;
    }
    execute(context: Context): void {
        //mergeDiff(context,diff)
    }

}