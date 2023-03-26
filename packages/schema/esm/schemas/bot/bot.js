import { z } from "zod";
import { botLEDStateSchema, ledStateSchema } from "./led";
import { poseSchema } from "./pose";
import { moduleDataSchema, moduleStateSchema, moduleTypeToDataSchema } from "./module";
// Bot status to show what the robot is doing
export var robotStatusLiteralSchema = z.union([
    z.literal("idle"),
    z.literal("moving"),
    z.literal("stopped"),
    z.literal("error"),
]);
// Describes a snapshot of the state of a robot
export var botStateSchema = z.object({
    name: z.string(),
    pose: poseSchema,
    targetPose: poseSchema,
    // batteryStatus: batteryStatusSchema, // Not sure if implementable
    ledState: botLEDStateSchema,
    status: robotStatusLiteralSchema,
    module: moduleStateSchema,
    stopped: z.boolean()
});
// Bits of the bot state that can be recalled
export var recallBotStateSchema = z.object({
    name: z.string(),
    targetPose: poseSchema,
    baseLEDState: ledStateSchema,
    module: z.object({
        type: z.string(),
        state: moduleDataSchema // Supposed to match the type of module
    }).refine(function (data) {
        // Check that the module type matches the module state
        var moduleType = data.type;
        var moduleState = data.state;
        var moduleDataSchema = moduleTypeToDataSchema[moduleType];
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
    }, { message: "Module type does not match module state, or module type not found" })
});
export var botConnectionStatusSchema = z.object({
    domainName: z.string(),
    connectionStatus: z.union([
        z.literal("connected"),
        z.literal("disconnected"),
    ])
});
export var fleetStateSchema = z.record(botStateSchema);
export var recallFleetStateSchema = z.record(recallBotStateSchema);
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
    var recallFleetState = {};
    for (var botName in fleetState) {
        recallFleetState[botName] = getRecallBotState(fleetState[botName]);
    }
    return recallFleetState;
}
