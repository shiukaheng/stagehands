import { z } from "zod";
import { presetRecallStateLiteralSchema, presetSchema } from "./preset";
import { stageBoundarySchema } from "./boundary";
export const stageStateSchema = z.object({
    presets: z.array(z.object({
        id: z.string(),
        value: presetSchema,
    })),
    activePreset: z.string().describe("The ID of the active preset").nullable(),
    presetRecallState: presetRecallStateLiteralSchema,
    boundary: stageBoundarySchema,
});
