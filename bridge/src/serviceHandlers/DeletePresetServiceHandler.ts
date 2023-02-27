import { Context } from "../controller/Context";
import { DeletePresetRequest, Preset, ResponseMessage } from "@schema/dist";
import { presetPoseSchema } from "@schema/src";

export async function DeletePresetServiceHandler(deletePresetRequest:DeletePresetRequest,context:Context):Promise<ResponseMessage> {
    const presetId = deletePresetRequest.presetId;

    let tempPresetState = context
    .getStageState()
    .presets[presetId]

    if (tempPresetState ===undefined){
        return {
            responseType: "error",
            message: `DeletePresetCommand error: preset Id :${presetId}does not exist`,
        }
    };
    delete context.getStageState().presets[presetId];

    return {
        responseType: "success",
        message: `preset ${presetId} deleted`,
    } as ResponseMessage;
    
}