//unsettled schema

import { z } from "zod";

import { compositePoseSchema, obstacleSchema } from "../bot/botState";

export const presetRecallStateLiteralSchema = z.union([
    z.literal("idle"),
    z.literal("recalling"),
    z.literal("error"),
]);

export const stageBoundarySchema = z.object({
    polygonVerticeCoordinates: z.number().array().length(2).array(), // assuming stageBoundary would be polygon
});

export const presetSchema = z.object({
    name: z.string().describe("The name of the preset"),
    poses: z
        .object({
            botID: z.string(),
            pose: compositePoseSchema,
        })
        .array(),
});

export const stageStateSchema = z.object({
    presets: presetSchema.array(),
    activePreset: z.string().describe("The ID of the active preset"),
    presetRecallState: presetRecallStateLiteralSchema,
    boundary: stageBoundarySchema, //Maybe a prop#erty of the preset
    obstacles: obstacleSchema.array(),
});

export type StageState = z.infer<typeof stageStateSchema>;
export type Preset = z.infer<typeof presetSchema>;
export type StageBoundary = z.infer<typeof stageBoundarySchema>;
export type PresetRecallStateLiteral = z.infer<
    typeof presetRecallStateLiteralSchema
>;
