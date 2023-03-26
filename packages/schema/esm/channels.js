import { createService, createTopic } from "webtopics";
import { botConnectionStatusSchema, fleetStateSchema, ledStateSchema, presetSchema, recallBotStateSchema, recallFleetStateSchema, stageStateSchema } from "./schemas/schemas";
import { z } from "zod";
// Topics
export var fleetTopic = createTopic("fleet", fleetStateSchema);
export var stageTopic = createTopic("stage", stageStateSchema);
export var botConnectionStatusTopic = createTopic("botConnectionStatus", z.array(botConnectionStatusSchema));
//Bot paring service
export var botPairingRequestSchema = z.object({
    bridgeIp: z.string(),
    bridgePort: z.number()
});
export var botPairingService = createService("botPairingService", botPairingRequestSchema);
export var botDisconnectionService = createService("botDisconnectionService");
// Bot services
export var recallBotStateService = createService("recallState", recallBotStateSchema);
/**
 * Service for bot to stop
 */
export var stopService = createService("stop");
/**
 * Service for clear bot stop
 */
export var clearStopService = createService("clearStop");
/**
 * Service for overwrite bot LED
 */
export var LEDOverwriteService = createService("LEDOverwrite", ledStateSchema);
/**
 * Service for clear bot LED overwrite
 */
export var restoreLEDService = createService("restoreLED");
/**
 * Service for bot to register its ID to the bridge
 */
export var botIDRegistrationService = createService("registerBotID", z.string(), z.string());
// Bridge services
// ===== Recalling fleet state =====
/**
 * Service to recall the state of the fleet
 */
export var recallFleetStateService = createService("recallFleetState", recallFleetStateSchema);
// ===== Preset CRUD =====
export var createPresetReturnSchema = z.string();
/**
 * Service to create a preset, returns the presetId
 */
export var createPresetService = createService("createPreset", presetSchema, createPresetReturnSchema);
export var updatePresetRequestSchema = z.object({
    presetId: z.string(),
    preset: presetSchema
});
/**
 * Service to update a preset
 */
export var updatePresetService = createService("updatePreset", updatePresetRequestSchema);
export var deletePresetRequestSchema = z.string();
/**
 * Service to delete a preset
 */
export var deletePresetService = createService("deletePreset", deletePresetRequestSchema);
/**
 * Service to reoder presets, takes an array of presetIds
 */
export var reorderPresetsService = createService("reorderPresets", z.array(z.string()));
/**
 * Service to run a preset
 */
export var runPresetService = createService("runPreset", z.string());
// ===== Bot emergency stop =====
/**
 * Service to stop all bots
 */
export var emergencyStopService = createService("emergencyStop");
/**
 * Service to clear the emergency stop
 */
export var emergencyStopClearService = createService("emergencyStopClear");
/**
 * Service to stop particular bot
 */
export var stopBotService = createService("stopBot", z.string());
/**
 * Service to clear the emergency stop for particular bot
 */
export var stopBotClearService = createService("stopBotClear", z.string());
// ===== LED overwrite =====
/**
 * Service to overwrite all bot's led
 */
export var overWriteLEDService = createService("overWriteLED", ledStateSchema);
/**
 * Service to overwrite particular bot's led
 */
export var overWriteBotLEDRequestSchema = z.object({
    botID: z.string(),
    ledState: ledStateSchema
});
export var overWriteBotLEDService = createService("overWriteBotLED", overWriteBotLEDRequestSchema);
/**
 * Service to clear particular bot's led overwrite
 */
export var clearBotLEDOverwriteService = createService("clearBotLEDOverwrite", z.string());
/**
 * Service to clear bot's led overwrite
 */
export var clearLEDOverwriteService = createService("clearLEDOverwrite");
/**
 * Service to connect bot
 *
 */
export var connectBotService = createService("connectBotService", z.string());
export var disconnectBotService = createService("disconnectBotService", z.string());
