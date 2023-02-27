import { z } from "zod";
export declare const presetRecallStateLiteralSchema: z.ZodUnion<[z.ZodLiteral<"idle">, z.ZodLiteral<"recalling">, z.ZodLiteral<"error">]>;
export type PresetRecallStateLiteral = z.infer<typeof presetRecallStateLiteralSchema>;
export declare const presetSchema: z.ZodObject<{
    name: z.ZodString;
    state: z.ZodRecord<z.ZodString, z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
}, {
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
export type Preset = z.infer<typeof presetSchema>;
export declare const presetSetSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    name: z.ZodString;
    state: z.ZodRecord<z.ZodString, z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>>;
export type PresetSet = z.infer<typeof presetSetSchema>;
