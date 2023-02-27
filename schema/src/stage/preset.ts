import { z } from "zod";
import { compositePoseSchema } from "../bot/botState";

export const presetRecallStateLiteralSchema = z.union([
    z.literal("idle"),
    z.literal("recalling"),
    z.literal("error"),
]);

export const presetPoseSchema = z
.object({
    botID: z.string(),
    pose: compositePoseSchema,
})
.array();
export const presetSchema = z.object({
    name: z.string().describe("The name of the preset"),
    poses: presetPoseSchema,
});

export type PresetRecallStateLiteral = z.infer<typeof presetRecallStateLiteralSchema>;
export type PresetPose = z.infer<typeof presetPoseSchema>;
export type Preset = z.infer<typeof  presetSchema>;