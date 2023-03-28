import { z } from "zod";
export declare const presetRecallStateLiteralSchema: z.ZodUnion<[z.ZodLiteral<"idle">, z.ZodLiteral<"recalling">, z.ZodLiteral<"error">]>;
export type PresetRecallStateLiteral = z.infer<typeof presetRecallStateLiteralSchema>;
export declare const presetSchema: z.ZodObject<{
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
export type Preset = z.infer<typeof presetSchema>;
export declare const presetSetSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
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
}>>;
export type PresetSet = z.infer<typeof presetSetSchema>;
