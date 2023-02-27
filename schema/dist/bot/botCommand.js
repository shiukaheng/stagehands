"use strict";
//unsettled schema
Object.defineProperty(exports, "__esModule", { value: true });
exports.botCommandSchema = exports.botCommandDataSchema = exports.botCommandLiteralSchema = exports.targetBotIdsSchema = void 0;
const zod_1 = require("zod");
exports.targetBotIdsSchema = zod_1.z.string().array();
exports.botCommandLiteralSchema = zod_1.z.union([
    zod_1.z.literal("moveToPose"),
    zod_1.z.literal("stop"),
    zod_1.z.literal("setLED"),
    zod_1.z.literal("requestState"),
    zod_1.z.literal("requestAllState"),
]);
exports.botCommandDataSchema = zod_1.z.any();
exports.botCommandSchema = zod_1.z.object({
    // The IDs of the bots to send the command to
    targetIds: exports.targetBotIdsSchema,
    // command string property that allows literal values
    botCommand: exports.botCommandLiteralSchema,
    // arbritrary data property
    botCommandData: exports.botCommandDataSchema,
});
