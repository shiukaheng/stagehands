import { responseMessageSchema } from "../../serverResponse";
import { presetSchema } from "../../stage/preset";
import {createService} from "webtopics"
import {z} from "zod"
export const createPresetRequestSchema = z.object({
    presetId:z.string(),
    preset:presetSchema
})

export const updatePresetRequestSchema = z.object({
    presetId:z.string(),
    preset:presetSchema
})

export const deletePresetRequestSchema = z.object({
    presetId:z.string(),
})

export const createPresetServiceChannel = createService(
    "createPreset",
    createPresetRequestSchema,
    responseMessageSchema
);
export const updatePresetServiceChannel = createService(
    "updatePreset",
    updatePresetRequestSchema,
    responseMessageSchema
);

export const deletePresetServiceChannel = createService(
    "deletePreset",
    deletePresetRequestSchema,
    responseMessageSchema
);

export type CreatePresetRequest =z.infer <typeof createPresetRequestSchema>
export type UpdatePresetRequest =z.infer <typeof updatePresetRequestSchema>
export type DeletePresetRequest =z.infer <typeof deletePresetRequestSchema>
