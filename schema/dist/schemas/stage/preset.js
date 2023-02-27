"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presetSetSchema = exports.presetSchema = exports.presetRecallStateLiteralSchema = void 0;
const zod_1 = require("zod");
const bot_1 = require("../bot/bot");
exports.presetRecallStateLiteralSchema = zod_1.z.union([
    zod_1.z.literal("idle"),
    zod_1.z.literal("recalling"),
    zod_1.z.literal("error"),
]);
exports.presetSchema = zod_1.z.object({
    name: zod_1.z.string().describe("The name of the preset"),
    state: bot_1.fleetStateSchema
});
exports.presetSetSchema = zod_1.z.record(exports.presetSchema);
