import { z } from "zod";
export declare const stageBoundarySchema: z.ZodObject<{
    polygonVertexCoordinates: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
}, "strip", z.ZodTypeAny, {
    polygonVertexCoordinates: number[][];
}, {
    polygonVertexCoordinates: number[][];
}>;
export declare const stageStateSchema: z.ZodObject<{
    presets: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
    activePreset: z.ZodString;
    presetRecallState: z.ZodUnion<[z.ZodLiteral<"idle">, z.ZodLiteral<"recalling">, z.ZodLiteral<"error">]>;
    boundary: z.ZodObject<{
        polygonVertexCoordinates: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
    }, "strip", z.ZodTypeAny, {
        polygonVertexCoordinates: number[][];
    }, {
        polygonVertexCoordinates: number[][];
    }>;
    obstacles: z.ZodArray<z.ZodObject<{
        polygonVerticeCoordinates: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
    }, "strip", z.ZodTypeAny, {
        polygonVerticeCoordinates: number[][];
    }, {
        polygonVerticeCoordinates: number[][];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    boundary: {
        polygonVertexCoordinates: number[][];
    };
    obstacles: {
        polygonVerticeCoordinates: number[][];
    }[];
    presets: {
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
    }[];
    activePreset: string;
    presetRecallState: "error" | "idle" | "recalling";
}, {
    boundary: {
        polygonVertexCoordinates: number[][];
    };
    obstacles: {
        polygonVerticeCoordinates: number[][];
    }[];
    presets: {
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
    }[];
    activePreset: string;
    presetRecallState: "error" | "idle" | "recalling";
}>;
export type StageState = z.infer<typeof stageStateSchema>;
export type StageBoundary = z.infer<typeof stageBoundarySchema>;
