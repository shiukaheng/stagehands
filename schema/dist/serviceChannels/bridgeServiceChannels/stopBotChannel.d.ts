import { z } from "zod";
export declare const stopBotRequestSchema: z.ZodObject<{
    botId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    botId: string;
}, {
    botId: string;
}>;
export declare const stopBotServiceChannel: import("webtopics/dist/utils/Channel").ServiceChannel<{
    botId: string;
}, {
    responseData?: any;
    message: string;
    responseType: string;
}>;
export type StopBotRequest = z.infer<typeof stopBotRequestSchema>;
