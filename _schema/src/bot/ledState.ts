import { z } from "zod";

export const LEDRGBValueSchema = z.number().array().length(3);

export const LEDOverwriteModeLiteralsSchema = z.union([
    z.literal("serverOverwrite"),
    z.literal("clientOverwrite"),
]);

export const LEDAnimationModeLiteralsSchema = z.union([
    z.literal("stable"),
    z.literal("Flashing"),
]);

export const LEDAnimationSchema = z.object({
    animationMode: LEDAnimationModeLiteralsSchema,
    flashingFrequency: z.number().optional(),
});

export const LEDStateSchema = z.object({
    ledOverwriteMode: LEDOverwriteModeLiteralsSchema,
    rgbValue: LEDRGBValueSchema,
    ledAnimation: LEDAnimationSchema,
});

export type LEDRGBValue = z.infer<typeof LEDRGBValueSchema>;
export type LEDOverwriteMode = z.infer<typeof LEDOverwriteModeLiteralsSchema>;
export type LEDAnimationMode = z.infer<typeof LEDAnimationModeLiteralsSchema>;
export type LEDAnimation = z.infer<typeof LEDAnimationSchema>;
export type LEDState = z.infer<typeof LEDStateSchema>;