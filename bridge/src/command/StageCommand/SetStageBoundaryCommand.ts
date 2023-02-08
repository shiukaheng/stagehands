import { stageBoundary } from "../../../../schema/src/stage/stageState";
import { StateChangeCommand } from "../stateChangeCommand";

export class SetStageBoundaryCommand extends StateChangeCommand<stageBoundary>{

    constructor(stageBoundary : stageBoundary){
        super(stageBoundary)
    }
    
}