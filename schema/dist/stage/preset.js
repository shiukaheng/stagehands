"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presetSchema = exports.presetPoseSchema = exports.presetRecallStateLiteralSchema = void 0;
const zod_1 = require("zod");
const botState_1 = require("../bot/botState");
exports.presetRecallStateLiteralSchema = zod_1.z.union([
    zod_1.z.literal("idle"),
    zod_1.z.literal("recalling"),
    zod_1.z.literal("error"),
]);
exports.presetPoseSchema = zod_1.z
    .object({
    botID: zod_1.z.string(),
    pose: botState_1.compositePoseSchema,
})
    .array();
exports.presetSchema = zod_1.z.object({
    name: zod_1.z.string().describe("The name of the preset"),
    poses: exports.presetPoseSchema,
});
