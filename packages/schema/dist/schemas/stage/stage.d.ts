import { z } from "zod";
export declare const stageStateSchema: z.ZodObject<{
    presets: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        value: z.ZodObject<{
            name: z.ZodString;
            state: z.ZodRecord<z.ZodString, z.ZodObject<{
                name: z.ZodString;
                targetPose: z.ZodObject<{
                    position: z.ZodArray<z.ZodNumber, "many">;
                    quaternion: z.ZodArray<z.ZodNumber, "many">;
                }, "strip", z.ZodTypeAny, {
                    position: number[];
                    quaternion: number[];
                }, {
                    position: number[];
                    quaternion: number[];
                }>;
                baseLEDState: z.ZodObject<{
                    rgbValue: z.ZodArray<z.ZodNumber, "many">;
                    ledAnimation: z.ZodObject<{
                        animationMode: z.ZodUnion<[z.ZodLiteral<"constant">, z.ZodLiteral<"flashing">]>;
                        flashingFrequency: z.ZodOptional<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        flashingFrequency?: number | undefined;
                        animationMode: "constant" | "flashing";
                    }, {
                        flashingFrequency?: number | undefined;
                        animationMode: "constant" | "flashing";
                    }>;
                }, "strip", z.ZodTypeAny, {
                    rgbValue: number[];
                    ledAnimation: {
                        flashingFrequency?: number | undefined;
                        animationMode: "constant" | "flashing";
                    };
                }, {
                    rgbValue: number[];
                    ledAnimation: {
                        flashingFrequency?: number | undefined;
                        animationMode: "constant" | "flashing";
                    };
                }>;
                module: z.ZodEffects<z.ZodObject<{
                    type: z.ZodString;
                    state: z.ZodUnion<[z.ZodObject<{
                        gripPosition: z.ZodNumber;
                        gripAngle: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        gripPosition: number;
                        gripAngle: number;
                    }, {
                        gripPosition: number;
                        gripAngle: number;
                    }>, z.ZodNull]>;
                }, "strip", z.ZodTypeAny, {
                    type: string;
                    state: {
                        gripPosition: number;
                        gripAngle: number;
                    } | null;
                }, {
                    type: string;
                    state: {
                        gripPosition: number;
                        gripAngle: number;
                    } | null;
                }>, {
                    type: string;
                    state: {
                        gripPosition: number;
                        gripAngle: number;
                    } | null;
                }, {
                    type: string;
                    state: {
                        gripPosition: number;
                        gripAngle: number;
                    } | null;
                }>;
            }, "strip", z.ZodTypeAny, {
                module: {
                    type: string;
                    state: {
                        gripPosition: number;
                        gripAngle: number;
                    } | null;
                };
                name: string;
                targetPose: {
                    position: number[];
                    quaternion: number[];
                };
                baseLEDState: {
                    rgbValue: number[];
                    ledAnimation: {
                        flashingFrequency?: number | undefined;
                        animationMode: "constant" | "flashing";
                    };
                };
            }, {
                module: {
                    type: string;
                    state: {
                        gripPosition: number;
                        gripAngle: number;
                    } | null;
                };
                name: string;
                targetPose: {
                    position: number[];
                    quaternion: number[];
                };
                baseLEDState: {
                    rgbValue: number[];
                    ledAnimation: {
                        flashingFrequency?: number | undefined;
                        animationMode: "constant" | "flashing";
                    };
                };
            }>>;
        }, "strip", z.ZodTypeAny, {
            state: Record<string, {
                module: {
                    type: string;
                    state: {
                        gripPosition: number;
                        gripAngle: number;
                    } | null;
                };
                name: string;
                targetPose: {
                    position: number[];
                    quaternion: number[];
                };
                baseLEDState: {
                    rgbValue: number[];
                    ledAnimation: {
                        flashingFrequency?: number | undefined;
                        animationMode: "constant" | "flashing";
                    };
                };
            }>;
            name: string;
        }, {
            state: Record<string, {
                module: {
                    type: string;
                    state: {
                        gripPosition: number;
                        gripAngle: number;
                    } | null;
                };
                name: string;
                targetPose: {
                    position: number[];
                    quaternion: number[];
                };
                baseLEDState: {
                    rgbValue: number[];
                    ledAnimation: {
                        flashingFrequency?: number | undefined;
                        animationMode: "constant" | "flashing";
                    };
                };
            }>;
            name: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        value: {
            state: Record<string, {
                module: {
                    type: string;
                    state: {
                        gripPosition: number;
                        gripAngle: number;
                    } | null;
                };
                name: string;
                targetPose: {
                    position: number[];
                    quaternion: number[];
                };
                baseLEDState: {
                    rgbValue: number[];
                    ledAnimation: {
                        flashingFrequency?: number | undefined;
                        animationMode: "constant" | "flashing";
                    };
                };
            }>;
            name: string;
        };
    }, {
        id: string;
        value: {
            state: Record<string, {
                module: {
                    type: string;
                    state: {
                        gripPosition: number;
                        gripAngle: number;
                    } | null;
                };
                name: string;
                targetPose: {
                    position: number[];
                    quaternion: number[];
                };
                baseLEDState: {
                    rgbValue: number[];
                    ledAnimation: {
                        flashingFrequency?: number | undefined;
                        animationMode: "constant" | "flashing";
                    };
                };
            }>;
            name: string;
        };
    }>, "many">;
    activePreset: z.ZodNullable<z.ZodString>;
    presetRecallState: z.ZodUnion<[z.ZodLiteral<"idle">, z.ZodLiteral<"recalling">, z.ZodLiteral<"error">]>;
    boundary: z.ZodObject<{
        polygonVertexCoordinates: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
    }, "strip", z.ZodTypeAny, {
        polygonVertexCoordinates: number[][];
    }, {
        polygonVertexCoordinates: number[][];
    }>;
}, "strip", z.ZodTypeAny, {
    boundary: {
        polygonVertexCoordinates: number[][];
    };
    presets: {
        id: string;
        value: {
            state: Record<string, {
                module: {
                    type: string;
                    state: {
                        gripPosition: number;
                        gripAngle: number;
                    } | null;
                };
                name: string;
                targetPose: {
                    position: number[];
                    quaternion: number[];
                };
                baseLEDState: {
                    rgbValue: number[];
                    ledAnimation: {
                        flashingFrequency?: number | undefined;
                        animationMode: "constant" | "flashing";
                    };
                };
            }>;
            name: string;
        };
    }[];
    activePreset: string | null;
    presetRecallState: "error" | "idle" | "recalling";
}, {
    boundary: {
        polygonVertexCoordinates: number[][];
    };
    presets: {
        id: string;
        value: {
            state: Record<string, {
                module: {
                    type: string;
                    state: {
                        gripPosition: number;
                        gripAngle: number;
                    } | null;
                };
                name: string;
                targetPose: {
                    position: number[];
                    quaternion: number[];
                };
                baseLEDState: {
                    rgbValue: number[];
                    ledAnimation: {
                        flashingFrequency?: number | undefined;
                        animationMode: "constant" | "flashing";
                    };
                };
            }>;
            name: string;
        };
    }[];
    activePreset: string | null;
    presetRecallState: "error" | "idle" | "recalling";
}>;
export type StageState = z.infer<typeof stageStateSchema>;