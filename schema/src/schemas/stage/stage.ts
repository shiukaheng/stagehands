import { z } from "zod";
import { presetRecallStateLiteralSchema, presetSchema } from "./preset";
import { stageBoundarySchema } from "./boundary";

export const stageStateSchema = z.object({
    presets: z.record(presetSchema),
    activePreset: z.string().describe("The ID of the active preset"),
    presetRecallState: presetRecallStateLiteralSchema,
    boundary: stageBoundarySchema,
});

export type StageState = z.infer<typeof stageStateSchema>;