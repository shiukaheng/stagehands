import { preset } from "../../../../schema/src/stage/stageState";
import { Context } from "../../controller/Context";
import { ICommand } from "../ICommand";
import { StateChangeCommand } from "../stateChangeCommand";

export class CreatePresetCommand extends StateChangeCommand<preset>{

    constructor(preset : preset){
        super(preset)
    }
    
}
   