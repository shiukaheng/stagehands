import { z } from "zod";

// Battery state

export const batteryPercentageSchema = z.number()
export type BatteryPercentage = z.infer<typeof batteryPercentageSchema>;

export const batteryStatusSchema = z.object({
    batteryPercentage: batteryPercentageSchema,
});
export type BatteryStatus = z.infer<typeof batteryStatusSchema>;