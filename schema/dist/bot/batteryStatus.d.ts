import { z } from "zod";
export declare const batteryPercentageSchema: z.ZodNumber;
export declare const batteryLevelLiteralsSchema: z.ZodUnion<[z.ZodLiteral<"low">, z.ZodLiteral<"medium">, z.ZodLiteral<"high">]>;
export declare const batteryStatusSchema: z.ZodObject<{
    batteryPercentage: z.ZodNumber;
    batteryLevel: z.ZodUnion<[z.ZodLiteral<"low">, z.ZodLiteral<"medium">, z.ZodLiteral<"high">]>;
}, "strip", z.ZodTypeAny, {
    batteryPercentage: number;
    batteryLevel: "high" | "low" | "medium";
}, {
    batteryPercentage: number;
    batteryLevel: "high" | "low" | "medium";
}>;
export type BatteryPercentage = z.infer<typeof batteryPercentageSchema>;
export type BatteryLevel = z.infer<typeof batteryLevelLiteralsSchema>;
export type BatteryStatus = z.infer<typeof batteryStatusSchema>;
