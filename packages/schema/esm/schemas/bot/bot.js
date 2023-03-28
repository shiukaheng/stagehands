import { z } from "zod";
import { batteryStatusSchema } from "./battery";
import { botLEDStateSchema, ledStateSchema } from "./led";
import { poseSchema } from "./pose";
import { moduleDataSchema, moduleStateSchema, moduleTypeToDataSchema } from "./module";
// Bot status to show what the robot is doing
export const robotStatusLiteralSchema = z.union([
    z.literal("idle"),
    z.literal("moving"),
    z.literal("stopped"),
    z.literal("error"),
]);
// Describes a snapshot of the state of a robot
export const botStateSchema = z.object({
    name: z.string(),
    pose: poseSchema,
    targetPose: poseSchema,
    batteryStatus: batteryStatusSchema,
    ledState: botLEDStateSchema,
    status: robotStatusLiteralSchema,
    module: moduleStateSchema,
    stopped: z.boolean(),
});
// Bits of the bot state that can be recalled
export const recallBotStateSchema = z.object({
    name: z.string(),
    targetPose: poseSchema,
    baseLEDState: ledStateSchema,
    module: z.object({
        type: z.string(),
        state: moduleDataSchema // Supposed to match the type of module
    }).refine((data) => {
        // Check that the module type matches the module state
        const moduleType = data.type;
        const moduleState = data.state;
        const moduleDataSchema = moduleTypeToDataSchema[moduleType];
        if (moduleDataSchema) {
            if (moduleDataSchema.safeParse(moduleState).success) {
                return true;
            }
            else {
                return false;
            }
        }
        else { // Module type not found
            return false;
        }
    }, { message: "Module type does not match module state, or module type not found" }),
});
export const botConnectionStatusSchema = z.union([
    z.literal("connected"),
    z.literal("disconnected"),
]);
export const botConnectionStateSchema = z.record(botConnectionStatusSchema);
export const fleetStateSchema = z.record(botStateSchema);
export const recallFleetStateSchema = z.record(recallBotStateSchema);
/**
 * Convenience function to get the recall bot state from the bot state
 */
export function getRecallBotState(botState) {
    return {
        name: botState.name,
        targetPose: botState.targetPose,
        baseLEDState: botState.ledState.base,
        module: {
            type: botState.module.type,
            state: botState.module.state
        }
    };
}
/**
 * Convenience function to get the recall fleet state from the fleet state
 */
export function getRecallFleetState(fleetState) {
    const recallFleetState = {};
    for (const botName in fleetState) {
        recallFleetState[botName] = getRecallBotState(fleetState[botName]);
    }
    return recallFleetState;
}
