import { Context } from "../../controller/Context";
import { ResponseMessage } from "schema";
import { ICommand } from "../ICommand";

export class RecallPresetCommand implements ICommand {
    private recallingPresetID: string;
    constructor(recallingPresetID: string) {
        this.recallingPresetID = recallingPresetID;
    }
    execute(context: Context): ResponseMessage {
        let tempPresetState = context
            .getStageState()
            .presets.find((preset) => preset.name === this.recallingPresetID);
        if (tempPresetState === undefined) {
            return {
                responseType: "error",
                message: `RecallPresetCommand error: ${this.recallingPresetID} not registered`,
            };
        }
        context.getStageState().activePreset = this.recallingPresetID;
        context.getStageState().presetRecallState = "recalling";
        for (let bot of tempPresetState.poses) {
            let newBotState = context
                .getTargetBotState()
                .find((botState) => botState.name === bot.botID);
            if (newBotState === undefined) {
                return {
                    responseType: "error",
                    message: `RecallPresetCommand error: bot ${bot.botID} not found in the recalling preset ${this.recallingPresetID}`,
                };
            }
            newBotState.module.modulePose = bot.pose.modulePose;
            newBotState.pose = bot.pose.pose;
        }
        return {
            responseType: "success",
            message: `Recalling ${this.recallingPresetID}`,
        };
    }
}
