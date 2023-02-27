import { Context } from "../controller/Context";
import { CreatePresetRequest, Preset, ResponseMessage } from "@schema/dist";


export async function CreatePresetServiceHandler(createPresetRequest:CreatePresetRequest,context:Context):Promise<ResponseMessage> {
    const presetId = createPresetRequest.presetId;
    const preset = createPresetRequest.preset;

    let tempPresetState = context
            .getStageState()
            .presets[presetId]
        if (tempPresetState !== undefined) {
            return {
                responseType: "error",
                message: `CreatePresetCommand error: preset Id :${presetId}already existed`,
            };
        }
        context.getStageState().presets[presetId]=preset;
        return {
            responseType: "success",
            message: `preset ${presetId} created`,
        } as ResponseMessage;
    }

