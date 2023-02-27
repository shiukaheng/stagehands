import { z } from "zod";
export declare const robotStatusLiteralSchema: z.ZodUnion<[z.ZodLiteral<"idle">, z.ZodLiteral<"moving">, z.ZodLiteral<"stopped">, z.ZodLiteral<"error">]>;
export type RobotStatus = z.infer<typeof robotStatusLiteralSchema>;
export declare const botStateSchema: z.ZodObject<{
    name: z.ZodString;
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
    ledState: z.ZodObject<{
        base: z.ZodObject<{
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
        systemOverride: z.ZodOptional<z.ZodObject<{
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
        }>>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>;
    status: z.ZodUnion<[z.ZodLiteral<"idle">, z.ZodLiteral<"moving">, z.ZodLiteral<"stopped">, z.ZodLiteral<"error">]>;
    module: z.ZodEffects<z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"micStand">, z.ZodLiteral<"nullModule">]>;
        moduleState: z.ZodUnion<[z.ZodObject<{
            gripPosition: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            gripPosition: number;
        }, {
            gripPosition: number;
        }>, z.ZodNull]>;
        moduleModels: z.ZodRecord<z.ZodString, z.ZodObject<{
            modelID: z.ZodString;
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
        }, "strip", z.ZodTypeAny, {
            modelID: string;
            pose: {
                position: number[];
                quaternion: number[];
            };
        }, {
            modelID: string;
            pose: {
                position: number[];
                quaternion: number[];
            };
        }>>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>, {
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
    }, {
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
    }>;
    stopped: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
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
}, {
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
export type BotState = z.infer<typeof botStateSchema>;
export declare const recallBotStateSchema: z.ZodObject<{
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
}>;
export type RecallBotState = z.infer<typeof recallBotStateSchema>;
export declare const fleetStateSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    name: z.ZodString;
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
    ledState: z.ZodObject<{
        base: z.ZodObject<{
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
        systemOverride: z.ZodOptional<z.ZodObject<{
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
        }>>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>;
    status: z.ZodUnion<[z.ZodLiteral<"idle">, z.ZodLiteral<"moving">, z.ZodLiteral<"stopped">, z.ZodLiteral<"error">]>;
    module: z.ZodEffects<z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"micStand">, z.ZodLiteral<"nullModule">]>;
        moduleState: z.ZodUnion<[z.ZodObject<{
            gripPosition: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            gripPosition: number;
        }, {
            gripPosition: number;
        }>, z.ZodNull]>;
        moduleModels: z.ZodRecord<z.ZodString, z.ZodObject<{
            modelID: z.ZodString;
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
        }, "strip", z.ZodTypeAny, {
            modelID: string;
            pose: {
                position: number[];
                quaternion: number[];
            };
        }, {
            modelID: string;
            pose: {
                position: number[];
                quaternion: number[];
            };
        }>>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>, {
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
    }, {
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
    }>;
    stopped: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
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
}, {
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
export type FleetState = z.infer<typeof fleetStateSchema>;
export declare const recallFleetStateSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
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
export type RecallFleetState = z.infer<typeof recallFleetStateSchema>;
/**
 * Convenience function to get the recall bot state from the bot state
 */
export declare function getRecallBotState(botState: BotState): RecallBotState;
/**
 * Convenience function to get the recall fleet state from the fleet state
 */
export declare function getRecallFleetState(fleetState: FleetState): RecallFleetState;
