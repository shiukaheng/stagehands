import { z } from "zod";

// LED state

// Primitives to define color, animation:
export const ledRGBValueSchema = z.number().array().length(3);
export type LEDRGBValue = z.infer<typeof ledRGBValueSchema>;

export const ledAnimationModeLiteralsSchema = z.union([
    z.literal("constant"),
    z.literal("flashing"),
]);
export type LEDAnimationMode = z.infer<typeof ledAnimationModeLiteralsSchema>;


export const ledAnimationSchema = z.object({
    animationMode: ledAnimationModeLiteralsSchema,
    flashingFrequency: z.number().optional(),
});
export type LEDAnimation = z.infer<typeof ledAnimationSchema>;

// Combining animation and color to define the state:
export const ledStateSchema = z.object({
    rgbValue: ledRGBValueSchema,
    ledAnimation: ledAnimationSchema,
});
export type LEDState = z.infer<typeof ledStateSchema>;

// Creating the actual robotic LED state to allow overrides:
export const botLEDStateSchema = z.object({
    // The default color / state for the bot
    base: ledStateSchema,
    // System override for displaying errors, etc
    systemOverride: ledStateSchema.optional(),
});
export type BotLEDState = z.infer<typeof botLEDStateSchema>;
