"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecallFleetState = exports.getRecallBotState = exports.recallFleetStateSchema = exports.fleetStateSchema = exports.botConnectionStatusSchema = exports.recallBotStateSchema = exports.botStateSchema = exports.robotStatusLiteralSchema = void 0;
const zod_1 = require("zod");
const battery_1 = require("./battery");
const led_1 = require("./led");
const pose_1 = require("./pose");
const module_1 = require("./module");
// Bot status to show what the robot is doing
exports.robotStatusLiteralSchema = zod_1.z.union([
    zod_1.z.literal("idle"),
    zod_1.z.literal("moving"),
    zod_1.z.literal("stopped"),
    zod_1.z.literal("error"),
]);
// Describes a snapshot of the state of a robot
exports.botStateSchema = zod_1.z.object({
    name: zod_1.z.string(),
    pose: pose_1.poseSchema,
    targetPose: pose_1.poseSchema,
    batteryStatus: battery_1.batteryStatusSchema,
    ledState: led_1.botLEDStateSchema,
    status: exports.robotStatusLiteralSchema,
    module: module_1.moduleStateSchema,
    stopped: zod_1.z.boolean(),
});
// Bits of the bot state that can be recalled
exports.recallBotStateSchema = zod_1.z.object({
    name: zod_1.z.string(),
    targetPose: pose_1.poseSchema,
    baseLEDState: led_1.ledStateSchema,
    module: zod_1.z.object({
        type: zod_1.z.string(),
        state: module_1.moduleDataSchema // Supposed to match the type of module
    }).refine((data) => {
        // Check that the module type matches the module state
        const moduleType = data.type;
        const moduleState = data.state;
        const moduleDataSchema = module_1.moduleTypeToDataSchema[moduleType];
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
exports.botConnectionStatusSchema = zod_1.z.union([
    zod_1.z.literal("connected"),
    zod_1.z.literal("disconnected"),
]);
exports.fleetStateSchema = zod_1.z.record(exports.botStateSchema);
exports.recallFleetStateSchema = zod_1.z.record(exports.recallBotStateSchema);
/**
 * Convenience function to get the recall bot state from the bot state
 */
function getRecallBotState(botState) {
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
exports.getRecallBotState = getRecallBotState;
/**
 * Convenience function to get the recall fleet state from the fleet state
 */
function getRecallFleetState(fleetState) {
    const recallFleetState = {};
    for (const botName in fleetState) {
        recallFleetState[botName] = getRecallBotState(fleetState[botName]);
    }
    return recallFleetState;
}
exports.getRecallFleetState = getRecallFleetState;
