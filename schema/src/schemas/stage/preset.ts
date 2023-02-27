import { z } from "zod";
import { fleetStateSchema } from "../bot/bot";

export const presetRecallStateLiteralSchema = z.union([
    z.literal("idle"),
    z.literal("recalling"),
    z.literal("error"),
]);
export type PresetRecallStateLiteral = z.infer<typeof presetRecallStateLiteralSchema>;

export const presetSchema = z.object({
    name: z.string().describe("The name of the preset"),
    state: fleetStateSchema
})
export type Preset = z.infer<typeof presetSchema>;

export const presetSetSchema = z.record(presetSchema);
export type PresetSet = z.infer<typeof presetSetSchema>;