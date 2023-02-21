import { Preset } from "../../../../schema/dist";
import { Context } from "../../controller/Context";
import { ResponseMessage } from "../../../../schema";
import { ICommand } from "../ICommand";

export class CreatePresetCommand implements ICommand {
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
        if (tempPresetState !== undefined) {
            return {
                responseType: "error",
                message: `CreatePresetCommand error: preset Id :${this.newPreset.name}already existed`,
            };
        }
        context.getStageState().presets.push(this.newPreset);
        return {
            responseType: "success",
            message: `preset ${this.newPreset.name} created`,
        } as ResponseMessage;
    }
}
