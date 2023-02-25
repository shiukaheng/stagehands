import { z } from "zod";

export const micStandPoseSchema = z.object({
    gripPosition: z.number(),
});
export type MicStandPose = z.infer<typeof micStandPoseSchema>;