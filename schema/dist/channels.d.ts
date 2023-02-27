import { z } from "zod";
export declare const fleetTopic: import("webtopics/dist/utils/Channel").TopicChannel<Record<string, {
    stopped: boolean;
    module: {
        type: "micStand" | "nullModule";
        moduleState: {
            gripPosition: number;
        } | null;
        moduleModels: Record<string, {
            modelID: string;
            pose: {
                position: number[];
                quaternion: number[];
            };
        }>;
    };
    name: string;
    status: "error" | "stopped" | "idle" | "moving";
    pose: {
        position: number[];
        quaternion: number[];
    };
    targetPose: {
        position: number[];
        quaternion: number[];
    };
    ledState: {
        systemOverride?: {
            rgbValue: number[];
            ledAnimation: {
                flashingFrequency?: number | undefined;
                animationMode: "constant" | "flashing";
            };
        } | undefined;
        base: {
            rgbValue: number[];
            ledAnimation: {
                flashingFrequency?: number | undefined;
                animationMode: "constant" | "flashing";
            };
        };
    };
}>>;
export declare const stageTopic: import("webtopics/dist/utils/Channel").TopicChannel<{
    boundary: {
        polygonVertexCoordinates: number[][];
    };
    presets: Record<string, {
        state: Record<string, {
            stopped: boolean;
            module: {
                type: "micStand" | "nullModule";
                moduleState: {
                    gripPosition: number;
                } | null;
                moduleModels: Record<string, {
                    modelID: string;
                    pose: {
                        position: number[];
                        quaternion: number[];
                    };
                }>;
            };
            name: string;
            status: "error" | "stopped" | "idle" | "moving";
            pose: {
                position: number[];
                quaternion: number[];
            };
            targetPose: {
                position: number[];
                quaternion: number[];
            };
            ledState: {
                systemOverride?: {
                    rgbValue: number[];
                    ledAnimation: {
                        flashingFrequency?: number | undefined;
                        animationMode: "constant" | "flashing";
                    };
                } | undefined;
                base: {
                    rgbValue: number[];
                    ledAnimation: {
                        flashingFrequency?: number | undefined;
                        animationMode: "constant" | "flashing";
                    };
                };
            };
        }>;
        name: string;
    }>;
    activePreset: string;
    presetRecallState: "error" | "idle" | "recalling";
}>;
export declare const recallBotStateService: import("webtopics/dist/utils/Channel").ServiceChannel<{
    module: {
        type: string;
        state: {
            gripPosition: number;
        } | null;
    };
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
}, void>;
/**
 * Service to recall the state of the fleet
 */
export declare const recallFleetStateService: import("webtopics/dist/utils/Channel").ServiceChannel<Record<string, {
    module: {
        type: string;
        state: {
            gripPosition: number;
        } | null;
    };
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
}>, void>;
export declare const createPresetReturnSchema: z.ZodString;
export type CreatePresetReturn = z.infer<typeof createPresetReturnSchema>;
/**
 * Service to create a preset, returns the presetId
 */
export declare const createPresetService: import("webtopics/dist/utils/Channel").ServiceChannel<Record<string, {
    module: {
        type: string;
        state: {
            gripPosition: number;
        } | null;
    };
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
}>, string>;
export declare const updatePresetRequestSchema: z.ZodObject<{
    presetId: z.ZodString;
    preset: z.ZodRecord<z.ZodString, z.ZodObject<{
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
                /**
                 * Service to recall the state of the fleet
                 */
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
            }, "strip", z.ZodTypeAny, {
                gripPosition: number;
            }, {
                gripPosition: number;
            }>, z.ZodNull]>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            state: {
                gripPosition: number;
            } | null;
        }, {
            type: string;
            state: {
                gripPosition: number;
            } | null;
        }>, {
            type: string;
            state: {
                gripPosition: number;
            } | null;
        }, {
            type: string;
            state: {
                gripPosition: number;
            } | null;
        }>;
    }, "strip", z.ZodTypeAny, {
        module: {
            type: string;
            state: {
                gripPosition: number;
            } | null;
        };
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
            } | null;
        };
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
    presetId: string;
    preset: Record<string, {
        module: {
            type: string;
            state: {
                gripPosition: number;
            } | null;
        };
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
}, {
    presetId: string;
    preset: Record<string, {
        module: {
            type: string;
            state: {
                gripPosition: number;
            } | null;
        };
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
}>;
export type UpdatePresetRequest = z.infer<typeof updatePresetRequestSchema>;
/**
 * Service to update a preset
 */
export declare const updatePresetService: import("webtopics/dist/utils/Channel").ServiceChannel<{
    presetId: string;
    preset: Record<string, {
        module: {
            type: string;
            state: {
                gripPosition: number;
            } | null;
        };
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
}, void>;
export declare const deletePresetRequestSchema: z.ZodString;
export type DeletePresetRequest = z.infer<typeof deletePresetRequestSchema>;
/**
 * Service to delete a preset
 */
export declare const deletePresetService: import("webtopics/dist/utils/Channel").ServiceChannel<string, void>;
/**
 * Service to stop all bots
 */
export declare const emergencyStopService: import("webtopics/dist/utils/Channel").ServiceChannel<void, void>;
/**
 * Service to clear the emergency stop
 */
export declare const emergencyStopClearService: import("webtopics/dist/utils/Channel").ServiceChannel<void, void>;
/**
 * Service to stop particular bot
 */
export declare const stopBotService: import("webtopics/dist/utils/Channel").ServiceChannel<string, void>;
/**
 * Service to clear the emergency stop for particular bot
 */
export declare const stopBotClearService: import("webtopics/dist/utils/Channel").ServiceChannel<string, void>;
