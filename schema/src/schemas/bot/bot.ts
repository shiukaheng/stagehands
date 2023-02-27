import { z } from "zod";
import { batteryStatusSchema } from "./battery";
import { botLEDStateSchema } from "./led";
import { poseSchema } from "./pose";
import { moduleStateSchema } from "./module";

// Bot status to show what the robot is doing
export const robotStatusLiteralSchema = z.union([
    z.literal("idle"),
    z.literal("moving"),
    z.literal("stopped"),
    z.literal("error"),
]);
export type RobotStatus = z.infer<typeof robotStatusLiteralSchema>;

export const botStateSchema = z.object({
    name: z.string(),
    pose: poseSchema,
    batteryStatus: batteryStatusSchema,
    ledState: botLEDStateSchema,
    status: robotStatusLiteralSchema,
    module: moduleStateSchema,
});
export type BotState = z.infer<typeof botStateSchema>;

export const fleetStateSchema = z.record(botStateSchema);
export type FleetState = z.infer<typeof fleetStateSchema>;