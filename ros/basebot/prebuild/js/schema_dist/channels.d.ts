import { z } from "zod";
export declare const fleetTopic: import("webtopics").TopicChannel<Record<string, {
    stopped: boolean;
    module: {
        type: "micStand" | "nullModule";
        state: {
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
export declare const stageTopic: import("webtopics").TopicChannel<{
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
export declare const botConnectionStatusTopic: import("webtopics").TopicChannel<{
    domainName: string;
    connectionStatus: "connected" | "disconnected";
}[]>;
export declare const botPairingRequestSchema: z.ZodObject<{
    bridgeIp: z.ZodString;
    bridgePort: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    bridgeIp: string;
    bridgePort: number;
}, {
    bridgeIp: string;
    bridgePort: number;
}>;
export declare const botPairingService: import("webtopics").ServiceChannel<{
    bridgeIp: string;
    bridgePort: number;
}, void>;
export declare const botDisconnectionService: import("webtopics").ServiceChannel<void, void>;
export declare const recallBotStateService: import("webtopics").ServiceChannel<{
    module: {
        type: string;
        state: {
            gripPosition: number;
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
}, void>;
/**
 * Service for bot to stop
 */
export declare const stopService: import("webtopics").ServiceChannel<void, void>;
/**
 * Service for clear bot stop
 */
export declare const clearStopService: import("webtopics").ServiceChannel<void, void>;
/**
 * Service for overwrite bot LED
 */
export declare const LEDOverwriteService: import("webtopics").ServiceChannel<{
    rgbValue: number[];
    ledAnimation: {
        flashingFrequency?: number | undefined;
        animationMode: "constant" | "flashing";
    };
}, void>;
/**
 * Service for clear bot LED overwrite
 */
export declare const restoreLEDService: import("webtopics").ServiceChannel<void, void>;
/**
 * Service for bot to register its ID to the bridge
 */
export declare const botIDRegistrationService: import("webtopics").ServiceChannel<string, string>;
/**
 * Service to recall the state of the fleet
 */
export declare const recallFleetStateService: import("webtopics").ServiceChannel<Record<string, {
    module: {
        type: string;
        state: {
            gripPosition: number;
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
}>, void>;
export declare const createPresetReturnSchema: z.ZodString;
export type CreatePresetReturn = z.infer<typeof createPresetReturnSchema>;
/**
 * Service to create a preset, returns the presetId
 */
export declare const createPresetService: import("webtopics").ServiceChannel<{
    state: Record<string, {
        module: {
            type: string;
            state: {
                gripPosition: number;
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
}, string>;
export declare const updatePresetRequestSchema: z.ZodObject<{
    presetId: z.ZodString;
    preset: z.ZodObject<{
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
    presetId: string;
    preset: {
        state: Record<string, {
            module: {
                type: string;
                state: {
                    gripPosition: number;
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
    presetId: string;
    preset: {
        state: Record<string, {
            module: {
                type: string;
                state: {
                    gripPosition: number;
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
}>;
export type UpdatePresetRequest = z.infer<typeof updatePresetRequestSchema>;
/**
 * Service to update a preset
 */
export declare const updatePresetService: import("webtopics").ServiceChannel<{
    presetId: string;
    preset: {
        state: Record<string, {
            module: {
                type: string;
                state: {
                    gripPosition: number;
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
}, void>;
export declare const deletePresetRequestSchema: z.ZodString;
export type DeletePresetRequest = z.infer<typeof deletePresetRequestSchema>;
/**
 * Service to delete a preset
 */
export declare const deletePresetService: import("webtopics").ServiceChannel<string, void>;
/**
 * Service to reoder presets, takes an array of presetIds
 */
export declare const reorderPresetsService: import("webtopics").ServiceChannel<string[], void>;
/**
 * Service to run a preset
 */
export declare const runPresetService: import("webtopics").ServiceChannel<string, void>;
/**
 * Service to stop all bots
 */
export declare const emergencyStopService: import("webtopics").ServiceChannel<void, void>;
/**
 * Service to clear the emergency stop
 */
export declare const emergencyStopClearService: import("webtopics").ServiceChannel<void, void>;
/**
 * Service to stop particular bot
 */
export declare const stopBotService: import("webtopics").ServiceChannel<string, void>;
/**
 * Service to clear the emergency stop for particular bot
 */
export declare const stopBotClearService: import("webtopics").ServiceChannel<string, void>;
/**
 * Service to overwrite all bot's led
 */
export declare const overWriteLEDService: import("webtopics").ServiceChannel<{
    rgbValue: number[];
    ledAnimation: {
        flashingFrequency?: number | undefined;
        animationMode: "constant" | "flashing";
    };
}, void>;
/**
 * Service to overwrite particular bot's led
 */
export declare const overWriteBotLEDRequestSchema: z.ZodObject<{
    botID: z.ZodString;
    ledState: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    ledState: {
        rgbValue: number[];
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "constant" | "flashing";
        };
    };
    botID: string;
}, {
    ledState: {
        rgbValue: number[];
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "constant" | "flashing";
        };
    };
    botID: string;
}>;
export type OverWriteBotLEDRequest = z.infer<typeof overWriteBotLEDRequestSchema>;
export declare const overWriteBotLEDService: import("webtopics").ServiceChannel<{
    ledState: {
        rgbValue: number[];
        ledAnimation: {
            flashingFrequency?: number | undefined;
            animationMode: "constant" | "flashing";
        };
    };
    botID: string;
}, void>;
/**
 * Service to clear particular bot's led overwrite
 */
export declare const clearBotLEDOverwriteService: import("webtopics").ServiceChannel<string, void>;
/**
 * Service to clear bot's led overwrite
 */
export declare const clearLEDOverwriteService: import("webtopics").ServiceChannel<void, void>;
/**
 * Service to connect bot
 *
 */
export declare const connectBotService: import("webtopics").ServiceChannel<string, void>;
export declare const disconnectBotService: import("webtopics").ServiceChannel<string, void>;
