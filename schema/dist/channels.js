"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopBotClearService = exports.stopBotService = exports.emergencyStopClearService = exports.emergencyStopService = exports.deletePresetService = exports.deletePresetRequestSchema = exports.updatePresetService = exports.updatePresetRequestSchema = exports.createPresetService = exports.createPresetReturnSchema = exports.recallFleetStateService = exports.recallBotStateService = exports.stageTopic = exports.fleetTopic = void 0;
const webtopics_1 = require("webtopics");
const schemas_1 = require("./schemas/schemas");
const zod_1 = require("zod");
// Topics
exports.fleetTopic = (0, webtopics_1.createTopic)("fleet", schemas_1.fleetStateSchema);
exports.stageTopic = (0, webtopics_1.createTopic)("stage", schemas_1.stageStateSchema);
// Bot services
exports.recallBotStateService = (0, webtopics_1.createService)("recallState", schemas_1.recallBotStateSchema);
// Bridge services
// ===== Recalling fleet state =====
/**
 * Service to recall the state of the fleet
 */
exports.recallFleetStateService = (0, webtopics_1.createService)("recallFleetState", schemas_1.recallFleetStateSchema);
// ===== Preset CRUD =====
exports.createPresetReturnSchema = zod_1.z.string();
/**
 * Service to create a preset, returns the presetId
 */
exports.createPresetService = (0, webtopics_1.createService)("createPreset", schemas_1.presetSchema, exports.createPresetReturnSchema);
exports.updatePresetRequestSchema = zod_1.z.object({
    presetId: zod_1.z.string(),
    preset: schemas_1.presetSchema
});
/**
 * Service to update a preset
 */
exports.updatePresetService = (0, webtopics_1.createService)("updatePreset", exports.updatePresetRequestSchema);
exports.deletePresetRequestSchema = zod_1.z.string();
/**
 * Service to delete a preset
 */
exports.deletePresetService = (0, webtopics_1.createService)("deletePreset", exports.deletePresetRequestSchema);
// ===== Bot emergency stop =====
/**
 * Service to stop all bots
 */
exports.emergencyStopService = (0, webtopics_1.createService)("emergencyStop");
/**
 * Service to clear the emergency stop
 */
exports.emergencyStopClearService = (0, webtopics_1.createService)("emergencyStopClear");
/**
 * Service to stop particular bot
 */
exports.stopBotService = (0, webtopics_1.createService)("stopBot", zod_1.z.string());
/**
 * Service to clear the emergency stop for particular bot
 */
exports.stopBotClearService = (0, webtopics_1.createService)("stopBotClear", zod_1.z.string());
