"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectBotService = exports.connectBotService = exports.clearLEDOverwriteService = exports.clearBotLEDOverwriteService = exports.overWriteBotLEDService = exports.overWriteBotLEDRequestSchema = exports.overWriteLEDService = exports.stopBotClearService = exports.stopBotService = exports.emergencyStopClearService = exports.emergencyStopService = exports.runPresetService = exports.reorderPresetsService = exports.deletePresetService = exports.deletePresetRequestSchema = exports.updatePresetService = exports.updatePresetRequestSchema = exports.createPresetService = exports.createPresetReturnSchema = exports.recallFleetStateService = exports.botIDRegistrationService = exports.restoreLEDService = exports.LEDOverwriteService = exports.clearStopService = exports.stopService = exports.recallBotStateService = exports.botDisconnectionService = exports.botPairingService = exports.botPairingRequestSchema = exports.botConnectionStatusTopic = exports.stageTopic = exports.fleetTopic = void 0;
const webtopics_1 = require("webtopics");
const schemas_1 = require("./schemas/schemas");
const zod_1 = require("zod");
// Topics
exports.fleetTopic = (0, webtopics_1.createTopic)("fleet", schemas_1.fleetStateSchema);
exports.stageTopic = (0, webtopics_1.createTopic)("stage", schemas_1.stageStateSchema);
exports.botConnectionStatusTopic = (0, webtopics_1.createTopic)("botConnectionStatus", zod_1.z.array(schemas_1.botConnectionStatusSchema));
//Bot paring service
exports.botPairingRequestSchema = zod_1.z.object({
    bridgeIp: zod_1.z.string(),
    bridgePort: zod_1.z.number()
});
exports.botPairingService = (0, webtopics_1.createService)("botPairingService", exports.botPairingRequestSchema);
exports.botDisconnectionService = (0, webtopics_1.createService)("botDisconnectionService");
// Bot services
exports.recallBotStateService = (0, webtopics_1.createService)("recallState", schemas_1.recallBotStateSchema);
/**
 * Service for bot to stop
 */
exports.stopService = (0, webtopics_1.createService)("stop");
/**
 * Service for clear bot stop
 */
exports.clearStopService = (0, webtopics_1.createService)("clearStop");
/**
 * Service for overwrite bot LED
 */
exports.LEDOverwriteService = (0, webtopics_1.createService)("LEDOverwrite", schemas_1.ledStateSchema);
/**
 * Service for clear bot LED overwrite
 */
exports.restoreLEDService = (0, webtopics_1.createService)("restoreLED");
/**
 * Service for bot to register its ID to the bridge
 */
exports.botIDRegistrationService = (0, webtopics_1.createService)("registerBotID", zod_1.z.string(), zod_1.z.string());
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
/**
 * Service to reoder presets, takes an array of presetIds
 */
exports.reorderPresetsService = (0, webtopics_1.createService)("reorderPresets", zod_1.z.array(zod_1.z.string()));
/**
 * Service to run a preset
 */
exports.runPresetService = (0, webtopics_1.createService)("runPreset", zod_1.z.string());
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
// ===== LED overwrite =====
/**
 * Service to overwrite all bot's led
 */
exports.overWriteLEDService = (0, webtopics_1.createService)("overWriteLED", schemas_1.ledStateSchema);
/**
 * Service to overwrite particular bot's led
 */
exports.overWriteBotLEDRequestSchema = zod_1.z.object({
    botID: zod_1.z.string(),
    ledState: schemas_1.ledStateSchema
});
exports.overWriteBotLEDService = (0, webtopics_1.createService)("overWriteBotLED", exports.overWriteBotLEDRequestSchema);
/**
 * Service to clear particular bot's led overwrite
 */
exports.clearBotLEDOverwriteService = (0, webtopics_1.createService)("clearBotLEDOverwrite", zod_1.z.string());
/**
 * Service to clear bot's led overwrite
 */
exports.clearLEDOverwriteService = (0, webtopics_1.createService)("clearLEDOverwrite");
/**
 * Service to connect bot
 *
 */
exports.connectBotService = (0, webtopics_1.createService)("connectBotService", zod_1.z.string());
exports.disconnectBotService = (0, webtopics_1.createService)("disconnectBotService", zod_1.z.string());
