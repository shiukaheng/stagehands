import { z } from "zod";
// LED state
// Primitives to define color, animation:
export var ledRGBValueSchema = z.number().array().length(3);
export var ledAnimationModeLiteralsSchema = z.union([
    z.literal("constant"),
    z.literal("flashing"),
]);
export var ledAnimationSchema = z.object({
    animationMode: ledAnimationModeLiteralsSchema,
    flashingFrequency: z.number().optional()
});
// Combining animation and color to define the state:
export var ledStateSchema = z.object({
    rgbValue: ledRGBValueSchema,
    ledAnimation: ledAnimationSchema
});
// Creating the actual robotic LED state to allow overrides:
export var botLEDStateSchema = z.object({
    // The default color / state for the bot
    base: ledStateSchema,
    // System override for displaying errors, etc
    systemOverride: ledStateSchema.optional()
});
