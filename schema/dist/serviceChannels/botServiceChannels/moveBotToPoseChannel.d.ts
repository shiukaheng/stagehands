import { z } from "zod";
export declare const moveBotToPoseRequestSchema: z.ZodObject<{
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
}, {
    botPose: {
        position: number[];
        quaternion: number[];
    };
}>;
export declare const moveBotToPoseServiceChannel: import("webtopics/dist/utils/Channel").ServiceChannel<{
    botPose: {
        position: number[];
        quaternion: number[];
    };
}, {
    responseData?: any;
    message: string;
    responseType: string;
}>;
