import { z } from "zod";

/**
 * Schema for a single bot's state
 */
export const botStateSchema = z.object({
    name: z.string(),
    position: z.array(z.number()).length(3),
    rotation: z.array(z.number()).length(4)
})
export type BotState = z.infer<typeof botStateSchema>;

/**
 * Schema for a set of bots' states
 */
export const fleetStateSchema = z.record(botStateSchema)
export type FleetState = z.infer<typeof fleetStateSchema>;

/**
 * Preset schema
 */
export const presetSchema = z.object({
    name: z.string(),
    bots: fleetStateSchema
})
export type Preset = z.infer<typeof presetSchema>;

/**
 * Schema for storing all presets
 */
export const presetsSchema = z.record(presetSchema)
export type Presets = z.infer<typeof presetsSchema>;