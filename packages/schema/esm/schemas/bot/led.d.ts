import { z } from "zod";
export declare const ledRGBValueSchema: z.ZodArray<z.ZodNumber, "many">;
export type LEDRGBValue = z.infer<typeof ledRGBValueSchema>;
export declare const ledAnimationModeLiteralsSchema: z.ZodUnion<[z.ZodLiteral<"constant">, z.ZodLiteral<"flashing">]>;
export type LEDAnimationMode = z.infer<typeof ledAnimationModeLiteralsSchema>;
export declare const ledAnimationSchema: z.ZodObject<{
    animationMode: z.ZodUnion<[z.ZodLiteral<"constant">, z.ZodLiteral<"flashing">]>;
    flashingFrequency: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    flashingFrequency?: number | undefined;
    animationMode: "constant" | "flashing";
}, {
    flashingFrequency?: number | undefined;
    animationMode: "constant" | "flashing";
}>;
export type LEDAnimation = z.infer<typeof ledAnimationSchema>;
export declare const ledStateSchema: z.ZodObject<{
    rgbValue: z.ZodArray<z.ZodNumber, "many">;
    ledAnimation: z.ZodObject<{
        animationMode: z.ZodUnion<[z.ZodLiteral<"constant">, z.ZodLiteral<"flashing">]>;
        flashingFrequency: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        flashingFrequency?: number | undefined;
        animationMode: "constant" | "flashing";
    }, {
        flashingFrequency?: number | undefined;
        animationMode: "constant" | "flashing";
    }>;
}, "strip", z.ZodTypeAny, {
    rgbValue: number[];
    ledAnimation: {
        flashingFrequency?: number | undefined;
        animationMode: "constant" | "flashing";
    };
}, {
    rgbValue: number[];
    ledAnimation: {
        flashingFrequency?: number | undefined;
        animationMode: "constant" | "flashing";
    };
}>;
export type LEDState = z.infer<typeof ledStateSchema>;
export declare const botLEDStateSchema: z.ZodObject<{
    base: z.ZodObject<{
        rgbValue: z.ZodArray<z.ZodNumber, "many">;
        ledAnimation: z.ZodObject<{
            animationMode: z.ZodUnion<[z.ZodLiteral<"constant">, z.ZodLiteral<"flashing">]>;
            flashingFrequency: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            flashingFrequency?: number | undefined;
            animationMode: "constant" | "flashing";
        }, {
            flashingFrequency?: number | undefined;
            animationMode: "constant" | "flashing";
        }>;
    }, "strip", z.ZodTypeAny, {
        rgbValue: number[];
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "constant" | "flashing";
        };
    }, {
        rgbValue: number[];
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "constant" | "flashing";
        };
    }>;
    systemOverride: z.ZodOptional<z.ZodObject<{
        rgbValue: z.ZodArray<z.ZodNumber, "many">;
        ledAnimation: z.ZodObject<{
            animationMode: z.ZodUnion<[z.ZodLiteral<"constant">, z.ZodLiteral<"flashing">]>;
            flashingFrequency: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            flashingFrequency?: number | undefined;
            animationMode: "constant" | "flashing";
        }, {
            flashingFrequency?: number | undefined;
            animationMode: "constant" | "flashing";
        }>;
    }, "strip", z.ZodTypeAny, {
        rgbValue: number[];
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "constant" | "flashing";
        };
    }, {
        rgbValue: number[];
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "constant" | "flashing";
        };
    }>>;
}, "strip", z.ZodTypeAny, {
    systemOverride?: {
        rgbValue: number[];
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "constant" | "flashing";
        };
    } | undefined;
    base: {
        rgbValue: number[];
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "constant" | "flashing";
        };
    };
}, {
    systemOverride?: {
        rgbValue: number[];
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "constant" | "flashing";
        };
    } | undefined;
    base: {
        rgbValue: number[];
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "constant" | "flashing";
        };
    };
}>;
export type BotLEDState = z.infer<typeof botLEDStateSchema>;
