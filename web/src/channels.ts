import { createService, createTopic } from "webtopics";
import { z } from "zod";
import { fleetStateSchema, presetSchema, presetsSchema } from "./schemas";

/**
 * Topic for live fleet state (all bots' states)
 */
export const liveFleetChannel = createTopic("liveFleet", fleetStateSchema);

/**
 * Topic for presets
 */
export const presetsChannel = createTopic("presets", presetsSchema);

/**
 * Service for creating a preset, returns the ID of the preset
 */
export const createPresetService = createService("createPreset", presetSchema, z.string());

/**
 * Service for deleting a preset
 */
export const deletePresetService = createService("deletePreset", z.string(), z.boolean());

/**
 * Service for updating a preset
 */
export const updatePresetService = createService("updatePreset", presetSchema, z.boolean());