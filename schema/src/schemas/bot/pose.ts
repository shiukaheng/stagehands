import { z } from "zod";

// Generic pose
export const poseSchema = z.object({
    position: z.number().array().length(3),
    quaternion: z.number().array().length(4),
});
export type Pose = z.infer<typeof poseSchema>;