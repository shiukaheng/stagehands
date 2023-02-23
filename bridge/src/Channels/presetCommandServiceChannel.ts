import { presetSchema } from "../../../schema";
import { Preset } from "../../../schema";
import { createService } from "webtopics";
import { responseMessageSchema } from "../../../schema/src/serverResponse";

export const createPresetCommandService = createService(
    "createPreset",
    presetSchema,
    responseMessageSchema
);
export const updatePresetCommandService = createService(
    "updatePreset",
    presetSchema,
    responseMessageSchema
);
export const deletePresetCommandService = createService(
    "deletePreset",
    presetSchema,
    responseMessageSchema
);
