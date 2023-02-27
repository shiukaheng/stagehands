"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePresetService = exports.deletePresetService = exports.createPresetService = exports.presetsChannel = exports.liveFleetChannel = void 0;
const webtopics_1 = require("webtopics");
const zod_1 = require("zod");
const schemas_1 = require("./schemas");
/**
 * Topic for live fleet state (all bots' states)
 */
exports.liveFleetChannel = (0, webtopics_1.createTopic)("liveFleet", schemas_1.fleetStateSchema);
/**
 * Topic for presets
 */
exports.presetsChannel = (0, webtopics_1.createTopic)("presets", schemas_1.presetsSchema);
/**
 * Service for creating a preset, returns the ID of the preset
 */
exports.createPresetService = (0, webtopics_1.createService)("createPreset", schemas_1.presetSchema, zod_1.z.string());
/**
 * Service for deleting a preset
 */
exports.deletePresetService = (0, webtopics_1.createService)("deletePreset", zod_1.z.string(), zod_1.z.boolean());
/**
 * Service for updating a preset
 */
exports.updatePresetService = (0, webtopics_1.createService)("updatePreset", schemas_1.presetSchema, zod_1.z.boolean());
