//unsettled schema

import { z } from "zod";

import { compositePoseSchema } from "../bot/botState";
import { obstacleSchema } from "./obstacle";
import { presetRecallStateLiteralSchema,presetSchema } from "./preset";



export const stageBoundarySchema = z.object({
    polygonVertexCoordinates: z.number().array().length(2).array(), // assuming stageBoundary would be polygon
});

export const stageStateSchema = z.object({
    presets: z.record(presetSchema),
    activePreset: z.string().describe("The ID of the active preset"),
    presetRecallState: presetRecallStateLiteralSchema,
    boundary: stageBoundarySchema, //Maybe a prop#erty of the preset
    obstacles: obstacleSchema.array(),
});

export type StageState = z.infer<typeof stageStateSchema>;
export type StageBoundary = z.infer<typeof stageBoundarySchema>;