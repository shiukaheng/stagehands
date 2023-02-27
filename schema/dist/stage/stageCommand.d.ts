import { z } from "zod";
export declare const stageCommandLiteralSchema: z.ZodUnion<[z.ZodLiteral<"capturePreset">, z.ZodLiteral<"recallPreset">, z.ZodLiteral<"stopAll">, z.ZodLiteral<"stop">, z.ZodLiteral<"setLED">, z.ZodLiteral<"stopAll">, z.ZodLiteral<"stop">, z.ZodLiteral<"setLED">, z.ZodLiteral<"requestAllState">, z.ZodLiteral<"requestBotState">, z.ZodLiteral<"setStageBoundary">]>;
export declare const stageCommandSchema: z.ZodObject<{
    command: z.ZodUnion<[z.ZodLiteral<"capturePreset">, z.ZodLiteral<"recallPreset">, z.ZodLiteral<"stopAll">, z.ZodLiteral<"stop">, z.ZodLiteral<"setLED">, z.ZodLiteral<"stopAll">, z.ZodLiteral<"stop">, z.ZodLiteral<"setLED">, z.ZodLiteral<"requestAllState">, z.ZodLiteral<"requestBotState">, z.ZodLiteral<"setStageBoundary">]>;
    commandData: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    commandData?: any;
    command: "stop" | "capturePreset" | "recallPreset" | "stopAll" | "setLED" | "requestAllState" | "requestBotState" | "setStageBoundary";
}, {
    commandData?: any;
    command: "stop" | "capturePreset" | "recallPreset" | "stopAll" | "setLED" | "requestAllState" | "requestBotState" | "setStageBoundary";
}>;
export type StageCommand = z.infer<typeof stageCommandSchema>;
export type StageCommandLiteral = z.infer<typeof stageCommandLiteralSchema>;
