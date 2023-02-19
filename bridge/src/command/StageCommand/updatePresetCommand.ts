import { preset } from "../../../../schema/src/stage/stageState";
import { Context } from "../../controller/Context";
import { responseMessage } from "../../../../schema/src/serverResponse"
import { ICommand } from "../ICommand";


export class UpdatePresetCommand implements ICommand{
    private newPreset: preset;
    constructor(newPreset:preset){
        this.newPreset = newPreset;
    }

    execute(context: Context): responseMessage {
        let tempPresetState = context.getStageState().presets.find(preset => preset.name ===this.newPreset.name)
        if(tempPresetState === undefined){
            return {
                responseType:'error',
                message:`UpdatePresetCommand error: preset Id :${this.newPreset.name} not found`
            }
        }
        if(context.getStageState().activePreset ===this.newPreset.name){
            return {
                responseType:'error',
                message:`UpdatePresetCommand error: can not update active preset ${this.newPreset.name}`
            }
        }
        tempPresetState = this.newPreset;
        
        return {
            responseType:'success',
            message:`Preset  ${this.newPreset.name} updated`
        }
    }
}