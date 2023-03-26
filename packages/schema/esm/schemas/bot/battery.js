import { z } from "zod";
// Battery state
export const batteryPercentageSchema = z.number();
export const batteryStatusSchema = z.object({
    batteryPercentage: batteryPercentageSchema,
});
