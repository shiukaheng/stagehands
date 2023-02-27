//Unsettled schema

import { z } from "zod";
import { LEDStateSchema } from "./ledState";
import { batteryStatusSchema } from "./batteryStatus";
import { modulePoseSchema } from "./modulePose";
import { moduleStateSchema } from "./modulePose";
import { obstacleSchema } from "../stage/obstacle";
//botState

export const robotStatusLiteralSchema = z.union([
    z.literal("idle"),
    z.literal("moving"),
    z.literal("stopped"),
    z.literal("error"),
]);

export const botPoseSchema = z.object({
    position: z.number().array().length(3),
    quaternion: z.number().array().length(4),
});

export const botStateSchema = z.object({
    name: z.string(),
    pose: botPoseSchema,
    obstacles: obstacleSchema.array(),
    batteryStatus: batteryStatusSchema,
    ledState: LEDStateSchema,
    status: robotStatusLiteralSchema,
    module: moduleStateSchema,
});
export const compositePoseSchema = z.object({
    pose: botPoseSchema,
    modulePose: modulePoseSchema,
});

export const aggregateBotStateSchema = z.record(botStateSchema);

export type BotState = z.infer<typeof botStateSchema>;
export type AggregateBotState = z.infer<typeof aggregateBotStateSchema>;
export type CompositePose = z.infer<typeof compositePoseSchema>;
export type BotPose = z.infer<typeof botPoseSchema>;


