import { z } from "zod";

export const micStandPoseSchema = z.object({
    gripPosition: z.number().gte(0).lte(1),
});
export type MicStandPose = z.infer<typeof micStandPoseSchema>;