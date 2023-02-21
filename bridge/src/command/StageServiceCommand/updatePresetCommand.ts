import { Preset } from "../../../../schema/dist";
import { Context } from "../../controller/Context";
import { ResponseMessage } from "../../../../schema/dist";
import { ICommand } from "../ICommand";

export class UpdatePresetCommand implements ICommand {
    private newPreset: Preset;
    constructor(newPreset: Preset) {
        this.newPreset = newPreset;
    }

    execute(context: Context): ResponseMessage {
        let tempPresetState = context
            .getStageState()
            .presets.find(
                (preset: { name: string }) => preset.name === this.newPreset.name
            );
        if (tempPresetState === undefined) {
            return {
                responseType: "error",
                message: `UpdatePresetCommand error: preset Id :${this.newPreset.name} not found`,
            };
        }
        if (context.getStageState().activePreset === this.newPreset.name) {
            return {
                responseType: "error",
                message: `UpdatePresetCommand error: can not update active preset ${this.newPreset.name}`,
            };
        }
        tempPresetState = this.newPreset;

        return {
            responseType: "success",
            message: `Preset  ${this.newPreset.name} updated`,
        };
    }
}
