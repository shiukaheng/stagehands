"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stageStateSchema = void 0;
const zod_1 = require("zod");
const preset_1 = require("./preset");
const boundary_1 = require("./boundary");
exports.stageStateSchema = zod_1.z.object({
    presets: zod_1.z.record(preset_1.presetSchema),
    activePreset: zod_1.z.string().describe("The ID of the active preset").nullable(),
    presetRecallState: preset_1.presetRecallStateLiteralSchema,
    boundary: boundary_1.stageBoundarySchema,
});
