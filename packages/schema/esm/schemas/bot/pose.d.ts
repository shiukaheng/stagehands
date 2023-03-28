import { z } from "zod";
export declare const poseSchema: z.ZodObject<{
    position: z.ZodArray<z.ZodNumber, "many">;
    quaternion: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    position: number[];
    quaternion: number[];
}, {
    position: number[];
    quaternion: number[];
}>;
export type Pose = z.infer<typeof poseSchema>;
