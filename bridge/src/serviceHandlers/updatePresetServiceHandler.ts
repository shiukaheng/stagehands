import { Context } from "../controller/Context";
import { UpdatePresetRequest, Preset, ResponseMessage } from "@schema/dist";


export async function CreatePresetServiceHandler(updatePresetRequest:UpdatePresetRequest,context:Context):Promise<ResponseMessage> {
    const presetId = updatePresetRequest.presetId;
    const preset = updatePresetRequest.preset;

    let tempPresetState = context
            .getStageState()
            .presets[presetId]
        if (tempPresetState === undefined) {
            return {
                responseType: "error",
                message: `UpdatePresetCommand error: preset Id :${presetId}does not exist`,
            };
        }
        context.getStageState().presets[presetId]=preset;
        return {
            responseType: "success",
            message: `preset ${presetId} updated`,
        } as ResponseMessage;
    }