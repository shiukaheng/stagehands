"use strict";
//Unsettled schema
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregateBotStateSchema = exports.compositePoseSchema = exports.botStateSchema = exports.botPoseSchema = exports.robotStatusLiteralSchema = void 0;
const zod_1 = require("zod");
const ledState_1 = require("./ledState");
const batteryStatus_1 = require("./batteryStatus");
const modulePose_1 = require("./modulePose");
const modulePose_2 = require("./modulePose");
const obstacle_1 = require("../stage/obstacle");
//botState
exports.robotStatusLiteralSchema = zod_1.z.union([
    zod_1.z.literal("idle"),
    zod_1.z.literal("moving"),
    zod_1.z.literal("stopped"),
    zod_1.z.literal("error"),
]);
exports.botPoseSchema = zod_1.z.object({
    position: zod_1.z.number().array().length(3),
    quaternion: zod_1.z.number().array().length(4),
});
exports.botStateSchema = zod_1.z.object({
    name: zod_1.z.string(),
    pose: exports.botPoseSchema,
    obstacles: obstacle_1.obstacleSchema.array(),
    batteryStatus: batteryStatus_1.batteryStatusSchema,
    ledState: ledState_1.ledStateSchema,
    status: exports.robotStatusLiteralSchema,
    module: modulePose_2.moduleStateSchema,
});
exports.compositePoseSchema = zod_1.z.object({
    pose: exports.botPoseSchema,
    modulePose: modulePose_1.modulePoseSchema,
});
exports.aggregateBotStateSchema = exports.botStateSchema.array();
