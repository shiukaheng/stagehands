/**
 * Topic for live fleet state (all bots' states)
 */
export declare const liveFleetChannel: import("webtopics/dist/utils/Channel").TopicChannel<Record<string, {
    name: string;
    position: number[];
    rotation: number[];
}>>;
/**
 * Topic for presets
 */
export declare const presetsChannel: import("webtopics/dist/utils/Channel").TopicChannel<Record<string, {
    name: string;
    bots: Record<string, {
        name: string;
        position: number[];
        rotation: number[];
    }>;
}>>;
/**
 * Service for creating a preset, returns the ID of the preset
 */
export declare const createPresetService: import("webtopics/dist/utils/Channel").ServiceChannel<{
    name: string;
    bots: Record<string, {
        name: string;
        position: number[];
        rotation: number[];
    }>;
}, string>;
/**
 * Service for deleting a preset
 */
export declare const deletePresetService: import("webtopics/dist/utils/Channel").ServiceChannel<string, boolean>;
/**
 * Service for updating a preset
 */
export declare const updatePresetService: import("webtopics/dist/utils/Channel").ServiceChannel<{
    name: string;
    bots: Record<string, {
        name: string;
        position: number[];
        rotation: number[];
    }>;
}, boolean>;
