"use strict";
//unsettled schema
Object.defineProperty(exports, "__esModule", { value: true });
exports.stageCommandSchema = exports.stageCommandLiteralSchema = void 0;
const zod_1 = require("zod");
// Define the schema for command literals and union them
exports.stageCommandLiteralSchema = zod_1.z.union([
    zod_1.z.literal("capturePreset"),
    zod_1.z.literal("recallPreset"),
    zod_1.z.literal("stopAll"),
    zod_1.z.literal("stop"),
    zod_1.z.literal("setLED"),
    zod_1.z.literal("stopAll"),
    zod_1.z.literal("stop"),
    zod_1.z.literal("setLED"),
    zod_1.z.literal("requestAllState"),
    zod_1.z.literal("requestBotState"),
    zod_1.z.literal("setStageBoundary"),
]);
// Define the schema for the StageCommand type
exports.stageCommandSchema = zod_1.z.object({
    // command string property that allows literal values
    command: exports.stageCommandLiteralSchema,
    // arbritrary data property
    commandData: zod_1.z.any(),
});
