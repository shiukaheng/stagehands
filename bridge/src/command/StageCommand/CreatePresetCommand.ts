import { preset } from "../../../../schema/src/stage/stageState";
import { Context } from "../../controller/Context";
import { responseMessage } from "../../../../schema/src/serverResponse"
import { ICommand } from "../ICommand";


export class CreatePresetCommand implements ICommand{
    private newPreset:preset;
    constructor(newPreset : preset){
        this.newPreset = newPreset;
    }
    execute(context: Context): responseMessage {
        let tempPresetState = context.getStageState().presets.find(preset => preset.name ===this.newPreset.name)
        if(tempPresetState !== undefined){
            return {
                responseType:'error',
                message:`CreatePresetCommand error: preset Id :${this.newPreset.name}already existed`
                
            }
        }
        context.getStageState().presets.push(this.newPreset)
        return {
            responseType:'success',
            message:`preset ${this.newPreset.name} created`
        } as responseMessage
    }
    
}
   