import { z } from "zod";

export const ledRGBValueSchema = z.number().array().length(3);

export const ledOverwriteModeLiteralsSchema = z.union([
    z.literal("serverOverwrite"),
    z.literal("clientOverwrite"),
]);

export const ledAnimationModeLiteralsSchema = z.union([
    z.literal("stable"),
    z.literal("Flashing"),
]);

export const ledAnimationSchema = z.object({
    animationMode: ledAnimationModeLiteralsSchema,
    flashingFrequency: z.number().optional(),
});

export const ledStateSchema = z.object({
    ledOverwriteMode: ledOverwriteModeLiteralsSchema,
    rgbValue: ledRGBValueSchema,
    ledAnimation: ledAnimationSchema,
});

export type LEDRGBValue = z.infer<typeof ledRGBValueSchema>;
export type LEDOverwriteMode = z.infer<typeof ledOverwriteModeLiteralsSchema>;
export type LEDAnimationMode = z.infer<typeof ledAnimationModeLiteralsSchema>;
export type LEDAnimation = z.infer<typeof ledAnimationSchema>;
export type LEDState = z.infer<typeof ledStateSchema>;