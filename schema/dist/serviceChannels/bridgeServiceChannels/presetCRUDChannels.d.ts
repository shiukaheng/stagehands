import { z } from "zod";
export declare const createPresetRequestSchema: z.ZodObject<{
    presetId: z.ZodString;
    preset: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    presetId: string;
    preset: {
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
    };
}, {
    presetId: string;
    preset: {
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
    };
}>;
export declare const updatePresetRequestSchema: z.ZodObject<{
    presetId: z.ZodString;
    preset: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    presetId: string;
    preset: {
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
    };
}, {
    presetId: string;
    preset: {
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
    };
}>;
export declare const deletePresetRequestSchema: z.ZodObject<{
    presetId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    presetId: string;
}, {
    presetId: string;
}>;
export declare const createPresetServiceChannel: import("webtopics/dist/utils/Channel").ServiceChannel<{
    presetId: string;
    preset: {
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
    };
}, {
    responseData?: any;
    message: string;
    responseType: string;
}>;
export declare const updatePresetServiceChannel: import("webtopics/dist/utils/Channel").ServiceChannel<{
    presetId: string;
    preset: {
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
    };
}, {
    responseData?: any;
    message: string;
    responseType: string;
}>;
export declare const deletePresetServiceChannel: import("webtopics/dist/utils/Channel").ServiceChannel<{
    presetId: string;
}, {
    responseData?: any;
    message: string;
    responseType: string;
}>;
export type CreatePresetRequest = z.infer<typeof createPresetRequestSchema>;
export type UpdatePresetRequest = z.infer<typeof updatePresetRequestSchema>;
export type DeletePresetRequest = z.infer<typeof deletePresetRequestSchema>;
