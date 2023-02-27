import { z } from "zod";
export declare const micStandPoseSchema: z.ZodObject<{
    gripPosition: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    gripPosition: number;
}, {
    gripPosition: number;
}>;
export type MicStandPose = z.infer<typeof micStandPoseSchema>;
