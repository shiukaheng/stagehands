import { z } from "zod";
// Battery state
export var batteryPercentageSchema = z.number();
export var batteryStatusSchema = z.object({
    batteryPercentage: batteryPercentageSchema
});
