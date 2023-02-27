
import { z } from "zod";
import {micStandPoseSchema} from "./micStandPose"
export const modulePoseSchema = micStandPoseSchema; //Should be an union with more moduleSchemas
export const moduleStateSchema = z.object({
    type: z.string(),
    moduleData: z.any(),
    modulePose: modulePoseSchema,
});
export type ModulePose = z.infer<typeof modulePoseSchema>;
export type ModuleState = z.infer<typeof moduleStateSchema>;