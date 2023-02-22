import { z } from "zod";

export const batteryPercentageSchema = z.number().gte(0).lte(1)
export const batteryLevelLiteralsSchema = z.union([
    z.literal("low"),
    z.literal("medium"),
    z.literal("high"),
]);
export const batteryStatusSchema = z.object({
    batteryPercentage: batteryPercentageSchema,
    batteryLevel: batteryLevelLiteralsSchema,
});

export type BatteryPercentage = z.infer<typeof batteryPercentageSchema>;
export type BatteryLevel = z.infer<typeof batteryLevelLiteralsSchema>;
export type BatteryStatus = z.infer<typeof batteryStatusSchema>;