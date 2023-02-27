"use strict";
//unsettled schema
Object.defineProperty(exports, "__esModule", { value: true });
exports.stageStateSchema = exports.stageBoundarySchema = void 0;
const zod_1 = require("zod");
const obstacle_1 = require("./obstacle");
const preset_1 = require("./preset");
exports.stageBoundarySchema = zod_1.z.object({
    polygonVertexCoordinates: zod_1.z.number().array().length(2).array(), // assuming stageBoundary would be polygon
});
exports.stageStateSchema = zod_1.z.object({
    presets: preset_1.presetSchema.array(),
    activePreset: zod_1.z.string().describe("The ID of the active preset"),
    presetRecallState: preset_1.presetRecallStateLiteralSchema,
    boundary: exports.stageBoundarySchema,
    obstacles: obstacle_1.obstacleSchema.array(),
});
