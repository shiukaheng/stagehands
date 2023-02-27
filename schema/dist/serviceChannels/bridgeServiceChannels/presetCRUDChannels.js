"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePresetServiceChannel = exports.updatePresetServiceChannel = exports.createPresetServiceChannel = exports.deletePresetRequestSchema = exports.updatePresetRequestSchema = exports.createPresetRequestSchema = void 0;
const serverResponse_1 = require("../../serverResponse");
const preset_1 = require("../../stage/preset");
const webtopics_1 = require("webtopics");
const zod_1 = require("zod");
exports.createPresetRequestSchema = zod_1.z.object({
    presetId: zod_1.z.string(),
    preset: preset_1.presetSchema
});
exports.updatePresetRequestSchema = zod_1.z.object({
    presetId: zod_1.z.string(),
    preset: preset_1.presetSchema
});
exports.deletePresetRequestSchema = zod_1.z.object({
    presetId: zod_1.z.string(),
});
exports.createPresetServiceChannel = (0, webtopics_1.createService)("createPreset", exports.createPresetRequestSchema, serverResponse_1.responseMessageSchema);
exports.updatePresetServiceChannel = (0, webtopics_1.createService)("updatePreset", exports.updatePresetRequestSchema, serverResponse_1.responseMessageSchema);
exports.deletePresetServiceChannel = (0, webtopics_1.createService)("deletePreset", exports.deletePresetRequestSchema, serverResponse_1.responseMessageSchema);
