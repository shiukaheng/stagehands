"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presetsSchema = exports.presetSchema = exports.fleetStateSchema = exports.botStateSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for a single bot's state
 */
exports.botStateSchema = zod_1.z.object({
    name: zod_1.z.string(),
    position: zod_1.z.array(zod_1.z.number()).length(3),
    rotation: zod_1.z.array(zod_1.z.number()).length(4)
});
/**
 * Schema for a set of bots' states
 */
exports.fleetStateSchema = zod_1.z.record(exports.botStateSchema);
/**
 * Preset schema
 */
exports.presetSchema = zod_1.z.object({
    name: zod_1.z.string(),
    bots: exports.fleetStateSchema
});
/**
 * Schema for storing all presets
 */
exports.presetsSchema = zod_1.z.record(exports.presetSchema);
