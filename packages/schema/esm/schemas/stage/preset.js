import { z } from "zod";
import { recallFleetStateSchema } from "../bot/bot";
export var presetRecallStateLiteralSchema = z.union([
    z.literal("idle"),
    z.literal("recalling"),
    z.literal("error"),
]);
export var presetSchema = z.object({
    name: z.string().describe("The name of the preset"),
    state: recallFleetStateSchema
});
export var presetSetSchema = z.record(presetSchema);
