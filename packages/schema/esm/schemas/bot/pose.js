import { z } from "zod";
// Generic pose
export var poseSchema = z.object({
    position: z.number().array().length(3),
    quaternion: z.number().array().length(4)
});
