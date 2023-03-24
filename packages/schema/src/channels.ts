import { createService, createTopic } from "webtopics";
import { fleetStateSchema, ledStateSchema, presetSchema, recallBotStateSchema, recallFleetStateSchema, stageStateSchema } from "./schemas/schemas";
import { z } from "zod";
import { type } from "os";

// Topics
export const fleetTopic = createTopic("fleet", fleetStateSchema)
export const stageTopic = createTopic("stage", stageStateSchema)


//Bot paring service
export const botPairingRequestSchema = z.object({
    bridgeIp:z.string(),
    bridgePort:z.number()
})
export const botParingService = createService("botPairingService",botPairingRequestSchema)
// Bot services
export const recallBotStateService = createService("recallState", recallBotStateSchema)

/**
 * Service for bot to stop
 */
export const stopService = createService("stop")

/**
 * Service for clear bot stop
 */
export const clearStopService = createService("clearStop")

/**
 * Service for overwrite bot LED
 */
export const LEDOverwriteService = createService("LEDOverwrite",ledStateSchema)

/**
 * Service for clear bot LED overwrite
 */
export const restoreLEDService = createService("restoreLED") 

/**
 * Service for bot to register its ID to the bridge
 */
export const botIDRegistrationService = createService("registerBotID",z.string(),z.string())

// Bridge services

// ===== Recalling fleet state =====

/**
 * Service to recall the state of the fleet
 */
export const recallFleetStateService = createService("recallFleetState", recallFleetStateSchema)

// ===== Preset CRUD =====

export const createPresetReturnSchema = z.string()
export type CreatePresetReturn = z.infer<typeof createPresetReturnSchema>
/**
 * Service to create a preset, returns the presetId
 */
export const createPresetService = createService("createPreset", presetSchema, createPresetReturnSchema)

export const updatePresetRequestSchema = z.object({
    presetId: z.string(),
    preset: presetSchema
})
export type UpdatePresetRequest = z.infer<typeof updatePresetRequestSchema>
/**
 * Service to update a preset
 */
export const updatePresetService = createService("updatePreset", updatePresetRequestSchema)

export const deletePresetRequestSchema = z.string()
export type DeletePresetRequest = z.infer<typeof deletePresetRequestSchema>
/**
 * Service to delete a preset
 */
export const deletePresetService = createService("deletePreset", deletePresetRequestSchema)

/**
 * Service to reoder presets, takes an array of presetIds
 */
export const reorderPresetsService = createService("reorderPresets", z.array(z.string()))

/** 
 * Service to run a preset
 */
export const runPresetService = createService("runPreset", z.string())

// ===== Bot emergency stop =====
/**
 * Service to stop all bots
 */
export const emergencyStopService = createService("emergencyStop")

/**
 * Service to clear the emergency stop
 */
export const emergencyStopClearService = createService("emergencyStopClear")

/**
 * Service to stop particular bot
 */
export const stopBotService = createService("stopBot", z.string())

/**
 * Service to clear the emergency stop for particular bot
 */
export const stopBotClearService = createService("stopBotClear", z.string())

// ===== LED overwrite =====
/**
 * Service to overwrite all bot's led
 */

export const overWriteLEDService = createService ("overWriteLED",ledStateSchema);

/**
 * Service to overwrite particular bot's led
 */
export const overWriteBotLEDRequestSchema = z.object({
    botID:z.string(),
    ledState: ledStateSchema
})
export type OverWriteBotLEDRequest = z.infer<typeof overWriteBotLEDRequestSchema>
export const overWriteBotLEDService = createService ("overWriteBotLED",overWriteBotLEDRequestSchema);

/**
 * Service to clear particular bot's led overwrite
 */
export const clearBotLEDOverwriteService = createService ("clearBotLEDOverwrite",z.string())

/**
 * Service to clear bot's led overwrite
 */
export const clearLEDOverwriteService = createService ("clearLEDOverwrite")
/**
 * Service to connect bot
 * 
 */
export const connectBotService =createService("connectBotService",z.string())


// export const registerBotClientIDRequestSchema = z.object({
//     botID:z.string(),
//     clientID:z.string()
// })
// export type RegisterBotClientIDRequest = z.infer<typeof registerBotClientIDRequestSchema>
// export const registerBotClientIDService = createService("receiveBotClientID",registerBotClientIDRequestSchema)
