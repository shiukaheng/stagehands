import { createService, createTopic } from "webtopics";
import { fleetStateSchema, presetSchema, recallBotStateSchema, recallFleetStateSchema, stageStateSchema } from "./schemas/schemas";
import { z } from "zod";

// Topics
export const fleetTopic = createTopic("fleet", fleetStateSchema)
export const stageTopic = createTopic("stage", stageStateSchema)

// Bot services
export const recallBotStateService = createService("recallState", recallBotStateSchema)

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