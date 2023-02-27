import { z } from "zod";
export declare const moveTargetBotToPoseRequestSchema: z.ZodObject<{
    botId: z.ZodString;
    botPose: z.ZodObject<{
        position: z.ZodArray<z.ZodNumber, "many">;
        quaternion: z.ZodArray<z.ZodNumber, "many">;
    }, "strip", z.ZodTypeAny, {
        position: number[];
        quaternion: number[];
    }, {
        position: number[];
        quaternion: number[];
    }>;
}, "strip", z.ZodTypeAny, {
    botPose: {
        position: number[];
        quaternion: number[];
    };
    botId: string;
}, {
    botPose: {
        position: number[];
        quaternion: number[];
    };
    botId: string;
}>;
export declare const moveTargetBotToPoseServiceChannel: import("webtopics/dist/utils/Channel").ServiceChannel<{
    botPose: {
        position: number[];
        quaternion: number[];
    };
    botId: string;
}, {
    responseData?: any;
    message: string;
    responseType: string;
}>;
export type MoveTargetBotToPoseRequest = z.infer<typeof moveTargetBotToPoseRequestSchema>;
