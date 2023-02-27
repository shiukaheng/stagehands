import { z } from "zod";
export declare const ledRGBValueSchema: z.ZodArray<z.ZodNumber, "many">;
export declare const ledOverwriteModeLiteralsSchema: z.ZodUnion<[z.ZodLiteral<"serverOverwrite">, z.ZodLiteral<"clientOverwrite">]>;
export declare const ledAnimationModeLiteralsSchema: z.ZodUnion<[z.ZodLiteral<"stable">, z.ZodLiteral<"Flashing">]>;
export declare const ledAnimationSchema: z.ZodObject<{
    animationMode: z.ZodUnion<[z.ZodLiteral<"stable">, z.ZodLiteral<"Flashing">]>;
    flashingFrequency: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    flashingFrequency?: number | undefined;
    animationMode: "stable" | "Flashing";
}, {
    flashingFrequency?: number | undefined;
    animationMode: "stable" | "Flashing";
}>;
export declare const ledStateSchema: z.ZodObject<{
    ledOverwriteMode: z.ZodUnion<[z.ZodLiteral<"serverOverwrite">, z.ZodLiteral<"clientOverwrite">]>;
    rgbValue: z.ZodArray<z.ZodNumber, "many">;
    ledAnimation: z.ZodObject<{
        animationMode: z.ZodUnion<[z.ZodLiteral<"stable">, z.ZodLiteral<"Flashing">]>;
        flashingFrequency: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        flashingFrequency?: number | undefined;
        animationMode: "stable" | "Flashing";
    }, {
        flashingFrequency?: number | undefined;
        animationMode: "stable" | "Flashing";
    }>;
}, "strip", z.ZodTypeAny, {
    ledOverwriteMode: "serverOverwrite" | "clientOverwrite";
    rgbValue: number[];
    ledAnimation: {
        flashingFrequency?: number | undefined;
        animationMode: "stable" | "Flashing";
    };
}, {
    ledOverwriteMode: "serverOverwrite" | "clientOverwrite";
    rgbValue: number[];
    ledAnimation: {
        flashingFrequency?: number | undefined;
        animationMode: "stable" | "Flashing";
    };
}>;
export type LEDRGBValue = z.infer<typeof ledRGBValueSchema>;
export type LEDOverwriteMode = z.infer<typeof ledOverwriteModeLiteralsSchema>;
export type LEDAnimationMode = z.infer<typeof ledAnimationModeLiteralsSchema>;
export type LEDAnimation = z.infer<typeof ledAnimationSchema>;
export type LEDState = z.infer<typeof ledStateSchema>;
