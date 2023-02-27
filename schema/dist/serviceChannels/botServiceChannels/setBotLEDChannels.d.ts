import { z } from "zod";
export declare const setBotLEDStateRequestSchema: z.ZodObject<{
    LEDId: z.ZodString;
    LEDState: z.ZodObject<{
        ledOverwriteMode: z.ZodUnion<[z.ZodLiteral<"serverOverwrite">, z.ZodLiteral<"clientOverwrite">]>;
        rgbValue: any;
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
        rgbValue?: any;
        ledOverwriteMode: "serverOverwrite" | "clientOverwrite";
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "stable" | "Flashing";
        };
    }, {
        rgbValue?: any;
        ledOverwriteMode: "serverOverwrite" | "clientOverwrite";
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "stable" | "Flashing";
        };
    }>;
}, "strip", z.ZodTypeAny, {
    LEDId: string;
    LEDState: {
        rgbValue?: any;
        ledOverwriteMode: "serverOverwrite" | "clientOverwrite";
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "stable" | "Flashing";
        };
    };
}, {
    LEDId: string;
    LEDState: {
        rgbValue?: any;
        ledOverwriteMode: "serverOverwrite" | "clientOverwrite";
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "stable" | "Flashing";
        };
    };
}>;
export declare const setBotLEDStateServiceChannel: import("webtopics/dist/utils/Channel").ServiceChannel<{
    LEDId: string;
    LEDState: {
        rgbValue?: any;
        ledOverwriteMode: "serverOverwrite" | "clientOverwrite";
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "stable" | "Flashing";
        };
    };
}, {
    responseData?: any;
    message: string;
    responseType: string;
}>;
export type SetBotLEDStateRequest = z.infer<typeof setBotLEDStateRequestSchema>;
