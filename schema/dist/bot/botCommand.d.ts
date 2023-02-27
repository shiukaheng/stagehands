import { z } from "zod";
export declare const targetBotIdsSchema: z.ZodArray<z.ZodString, "many">;
export declare const botCommandLiteralSchema: z.ZodUnion<[z.ZodLiteral<"moveToPose">, z.ZodLiteral<"stop">, z.ZodLiteral<"setLED">, z.ZodLiteral<"requestState">, z.ZodLiteral<"requestAllState">]>;
export declare const botCommandDataSchema: z.ZodAny;
export declare const botCommandSchema: z.ZodObject<{
    targetIds: z.ZodArray<z.ZodString, "many">;
    botCommand: z.ZodUnion<[z.ZodLiteral<"moveToPose">, z.ZodLiteral<"stop">, z.ZodLiteral<"setLED">, z.ZodLiteral<"requestState">, z.ZodLiteral<"requestAllState">]>;
    botCommandData: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    botCommandData?: any;
    targetIds: string[];
    botCommand: "stop" | "setLED" | "requestAllState" | "moveToPose" | "requestState";
}, {
    botCommandData?: any;
    targetIds: string[];
    botCommand: "stop" | "setLED" | "requestAllState" | "moveToPose" | "requestState";
}>;
export type TargetBotIds = z.infer<typeof targetBotIdsSchema>;
export type BotCommandLiteral = z.infer<typeof botCommandLiteralSchema>;
export type BotCommandData = z.infer<typeof botCommandDataSchema>;
export type BotCommand = z.infer<typeof botCommandSchema>;
