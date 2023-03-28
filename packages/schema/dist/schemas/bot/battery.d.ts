import { z } from "zod";
export declare const batteryPercentageSchema: z.ZodNumber;
export type BatteryPercentage = z.infer<typeof batteryPercentageSchema>;
export declare const batteryStatusSchema: z.ZodObject<{
    batteryPercentage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    batteryPercentage: number;
}, {
    batteryPercentage: number;
}>;
export type BatteryStatus = z.infer<typeof batteryStatusSchema>;
