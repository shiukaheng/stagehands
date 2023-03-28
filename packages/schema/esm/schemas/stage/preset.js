import { z } from "zod";
import { recallFleetStateSchema } from "../bot/bot";
export const presetRecallStateLiteralSchema = z.union([
    z.literal("idle"),
    z.literal("recalling"),
    z.literal("error"),
]);
export const presetSchema = z.object({
    name: z.string().describe("The name of the preset"),
    state: recallFleetStateSchema
});
export const presetSetSchema = z.record(presetSchema);
