import { z } from "zod";
export declare const presetRecallStateLiteralSchema: z.ZodUnion<[z.ZodLiteral<"idle">, z.ZodLiteral<"recalling">, z.ZodLiteral<"error">]>;
export declare const presetPoseSchema: z.ZodArray<z.ZodObject<{
    botID: z.ZodString;
    pose: z.ZodObject<{
        pose: z.ZodObject<{
            position: z.ZodArray<z.ZodNumber, "many">;
            quaternion: z.ZodArray<z.ZodNumber, "many">;
        }, "strip", z.ZodTypeAny, {
            position: number[];
            quaternion: number[];
        }, {
            position: number[];
            quaternion: number[];
        }>;
        modulePose: z.ZodObject<{
            gripPosition: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            gripPosition: number;
        }, {
            gripPosition: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        modulePose: {
            gripPosition: number;
        };
        pose: {
            position: number[];
            quaternion: number[];
        };
    }, {
        modulePose: {
            gripPosition: number;
        };
        pose: {
            position: number[];
            quaternion: number[];
        };
    }>;
}, "strip", z.ZodTypeAny, {
    pose: {
        modulePose: {
            gripPosition: number;
        };
        pose: {
            position: number[];
            quaternion: number[];
        };
    };
    botID: string;
}, {
    pose: {
        modulePose: {
            gripPosition: number;
        };
        pose: {
            position: number[];
            quaternion: number[];
        };
    };
    botID: string;
}>, "many">;
export declare const presetSchema: z.ZodObject<{
    name: z.ZodString;
    poses: z.ZodArray<z.ZodObject<{
        botID: z.ZodString;
        pose: z.ZodObject<{
            pose: z.ZodObject<{
                position: z.ZodArray<z.ZodNumber, "many">;
                quaternion: z.ZodArray<z.ZodNumber, "many">;
            }, "strip", z.ZodTypeAny, {
                position: number[];
                quaternion: number[];
            }, {
                position: number[];
                quaternion: number[];
            }>;
            modulePose: z.ZodObject<{
                gripPosition: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                gripPosition: number;
            }, {
                gripPosition: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            modulePose: {
                gripPosition: number;
            };
            pose: {
                position: number[];
                quaternion: number[];
            };
        }, {
            modulePose: {
                gripPosition: number;
            };
            pose: {
                position: number[];
                quaternion: number[];
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        pose: {
            modulePose: {
                gripPosition: number;
            };
            pose: {
                position: number[];
                quaternion: number[];
            };
        };
        botID: string;
    }, {
        pose: {
            modulePose: {
                gripPosition: number;
            };
            pose: {
                position: number[];
                quaternion: number[];
            };
        };
        botID: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    poses: {
        pose: {
            modulePose: {
                gripPosition: number;
            };
            pose: {
                position: number[];
                quaternion: number[];
            };
        };
        botID: string;
    }[];
}, {
    name: string;
    poses: {
        pose: {
            modulePose: {
                gripPosition: number;
            };
            pose: {
                position: number[];
                quaternion: number[];
            };
        };
        botID: string;
    }[];
}>;
export type PresetRecallStateLiteral = z.infer<typeof presetRecallStateLiteralSchema>;
export type PresetPose = z.infer<typeof presetPoseSchema>;
export type Preset = z.infer<typeof presetSchema>;
