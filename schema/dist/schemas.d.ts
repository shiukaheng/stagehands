import { z } from "zod";
/**
 * Schema for a single bot's state
 */
export declare const botStateSchema: z.ZodObject<{
    name: z.ZodString;
    position: z.ZodArray<z.ZodNumber, "many">;
    rotation: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    position: number[];
    rotation: number[];
}, {
    name: string;
    position: number[];
    rotation: number[];
}>;
export type BotState = z.infer<typeof botStateSchema>;
/**
 * Schema for a set of bots' states
 */
export declare const fleetStateSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    name: z.ZodString;
    position: z.ZodArray<z.ZodNumber, "many">;
    rotation: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    position: number[];
    rotation: number[];
}, {
    name: string;
    position: number[];
    rotation: number[];
}>>;
export type FleetState = z.infer<typeof fleetStateSchema>;
/**
 * Preset schema
 */
export declare const presetSchema: z.ZodObject<{
    name: z.ZodString;
    bots: z.ZodRecord<z.ZodString, z.ZodObject<{
        name: z.ZodString;
        position: z.ZodArray<z.ZodNumber, "many">;
        rotation: z.ZodArray<z.ZodNumber, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        position: number[];
        rotation: number[];
    }, {
        name: string;
        position: number[];
        rotation: number[];
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    bots: Record<string, {
        name: string;
        position: number[];
        rotation: number[];
    }>;
}, {
    name: string;
    bots: Record<string, {
        name: string;
        position: number[];
        rotation: number[];
    }>;
}>;
export type Preset = z.infer<typeof presetSchema>;
/**
 * Schema for storing all presets
 */
export declare const presetsSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    name: z.ZodString;
    bots: z.ZodRecord<z.ZodString, z.ZodObject<{
        name: z.ZodString;
        position: z.ZodArray<z.ZodNumber, "many">;
        rotation: z.ZodArray<z.ZodNumber, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        position: number[];
        rotation: number[];
    }, {
        name: string;
        position: number[];
        rotation: number[];
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    bots: Record<string, {
        name: string;
        position: number[];
        rotation: number[];
    }>;
}, {
    name: string;
    bots: Record<string, {
        name: string;
        position: number[];
        rotation: number[];
    }>;
}>>;
export type Presets = z.infer<typeof presetsSchema>;
