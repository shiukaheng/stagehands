import { z } from "zod";
import { batteryStatusSchema } from "./battery";
import { botLEDStateSchema, ledStateSchema } from "./led";
import { poseSchema } from "./pose";
import { ModuleType, moduleDataSchema, moduleStateSchema, moduleTypeToDataSchema } from "./module";

// Bot status to show what the robot is doing
export const robotStatusLiteralSchema = z.union([
    z.literal("idle"),
    z.literal("moving"),
    z.literal("stopped"),
    z.literal("error"),
]);
export type RobotStatus = z.infer<typeof robotStatusLiteralSchema>;

// Describes a snapshot of the state of a robot
export const botStateSchema = z.object({
    name: z.string(),
    pose: poseSchema, // Current pose of the robot
    targetPose: poseSchema, // Target pose of the robot
    batteryStatus: batteryStatusSchema, // Not sure if implementable
    ledState: botLEDStateSchema,
    status: robotStatusLiteralSchema,
    module: moduleStateSchema,
    stopped: z.boolean(),
})
export type BotState = z.infer<typeof botStateSchema>;

// Bits of the bot state that can be recalled
export const recallBotStateSchema = z.object({
    name : z.string(),
    targetPose: poseSchema, // The robot will move back to this pose
    baseLEDState: ledStateSchema, // The robot will set its base LED state to this
    module: z.object({
        type: z.string(), // Type of module represented in string
        state: moduleDataSchema // Supposed to match the type of module
    }).refine((data)=>{
        // Check that the module type matches the module state
        const moduleType = data.type;
        const moduleState = data.state;
        const moduleDataSchema = moduleTypeToDataSchema[moduleType as ModuleType];
        if ( moduleDataSchema ) {
            if (moduleDataSchema.safeParse(moduleState).success) {
                return true;
            } else {
                return false;
            }
        } else { // Module type not found
            return false;
        }
    }, {message: "Module type does not match module state, or module type not found"}),
})
export const botConnectionStatusSchema = z.object({
    domainName:z.string(),
    connectionStatus: z.union([
        z.literal("connected"),
        z.literal("disconnected"),

    ])
})
export type BotConnectionStatus=z.infer<typeof botConnectionStatusSchema>
export type RecallBotState = z.infer<typeof recallBotStateSchema>;

export const fleetStateSchema = z.record(botStateSchema);
export type FleetState = z.infer<typeof fleetStateSchema>;

export const recallFleetStateSchema = z.record(recallBotStateSchema);
export type RecallFleetState = z.infer<typeof recallFleetStateSchema>;

/**
 * Convenience function to get the recall bot state from the bot state
 */
export function getRecallBotState(botState: BotState): RecallBotState {
    return {
        name : botState.name,
        targetPose: botState.targetPose,
        baseLEDState: botState.ledState.base,
        module: {
            type: botState.module.type,
            state: botState.module.state
        }
    }
}

/**
 * Convenience function to get the recall fleet state from the fleet state
 */
export function getRecallFleetState(fleetState: FleetState): RecallFleetState {
    const recallFleetState: RecallFleetState = {};
    for (const botName in fleetState) {
        recallFleetState[botName] = getRecallBotState(fleetState[botName]);
    }
    return recallFleetState;
}