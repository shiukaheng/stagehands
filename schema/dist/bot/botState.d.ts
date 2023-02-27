import { z } from "zod";
export declare const robotStatusLiteralSchema: z.ZodUnion<[z.ZodLiteral<"idle">, z.ZodLiteral<"moving">, z.ZodLiteral<"stopped">, z.ZodLiteral<"error">]>;
export declare const botPoseSchema: z.ZodObject<{
    position: z.ZodArray<z.ZodNumber, "many">;
    quaternion: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    position: number[];
    quaternion: number[];
}, {
    position: number[];
    quaternion: number[];
}>;
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
    obstacles: z.ZodArray<z.ZodObject<{
        polygonVerticeCoordinates: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
    }, "strip", z.ZodTypeAny, {
        polygonVerticeCoordinates: number[][];
    }, {
        polygonVerticeCoordinates: number[][];
    }>, "many">;
    batteryStatus: z.ZodObject<{
        batteryPercentage: z.ZodNumber;
        batteryLevel: z.ZodUnion<[z.ZodLiteral<"low">, z.ZodLiteral<"medium">, z.ZodLiteral<"high">]>;
    }, "strip", z.ZodTypeAny, {
        batteryPercentage: number;
        batteryLevel: "high" | "low" | "medium";
    }, {
        batteryPercentage: number;
        batteryLevel: "high" | "low" | "medium";
    }>;
    ledState: any;
    status: z.ZodUnion<[z.ZodLiteral<"idle">, z.ZodLiteral<"moving">, z.ZodLiteral<"stopped">, z.ZodLiteral<"error">]>;
    module: z.ZodObject<{
        type: z.ZodString;
        moduleData: z.ZodAny;
        modulePose: z.ZodObject<{
            gripPosition: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            gripPosition: number;
        }, {
            gripPosition: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        moduleData?: any;
        type: string;
        modulePose: {
            gripPosition: number;
        };
    }, {
        moduleData?: any;
        type: string;
        modulePose: {
            gripPosition: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    ledState?: any;
    module: {
        moduleData?: any;
        type: string;
        modulePose: {
            gripPosition: number;
        };
    };
    name: string;
    status: "error" | "stopped" | "idle" | "moving";
    pose: {
        position: number[];
        quaternion: number[];
    };
    obstacles: {
        polygonVerticeCoordinates: number[][];
    }[];
    batteryStatus: {
        batteryPercentage: number;
        batteryLevel: "high" | "low" | "medium";
    };
}, {
    ledState?: any;
    module: {
        moduleData?: any;
        type: string;
        modulePose: {
            gripPosition: number;
        };
    };
    name: string;
    status: "error" | "stopped" | "idle" | "moving";
    pose: {
        position: number[];
        quaternion: number[];
    };
    obstacles: {
        polygonVerticeCoordinates: number[][];
    }[];
    batteryStatus: {
        batteryPercentage: number;
        batteryLevel: "high" | "low" | "medium";
    };
}>;
export declare const compositePoseSchema: z.ZodObject<{
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
export declare const aggregateBotStateSchema: z.ZodArray<z.ZodObject<{
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
    obstacles: z.ZodArray<z.ZodObject<{
        polygonVerticeCoordinates: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
    }, "strip", z.ZodTypeAny, {
        polygonVerticeCoordinates: number[][];
    }, {
        polygonVerticeCoordinates: number[][];
    }>, "many">;
    batteryStatus: z.ZodObject<{
        batteryPercentage: z.ZodNumber;
        batteryLevel: z.ZodUnion<[z.ZodLiteral<"low">, z.ZodLiteral<"medium">, z.ZodLiteral<"high">]>;
    }, "strip", z.ZodTypeAny, {
        batteryPercentage: number;
        batteryLevel: "high" | "low" | "medium";
    }, {
        batteryPercentage: number;
        batteryLevel: "high" | "low" | "medium";
    }>;
    ledState: any;
    status: z.ZodUnion<[z.ZodLiteral<"idle">, z.ZodLiteral<"moving">, z.ZodLiteral<"stopped">, z.ZodLiteral<"error">]>;
    module: z.ZodObject<{
        type: z.ZodString;
        moduleData: z.ZodAny;
        modulePose: z.ZodObject<{
            gripPosition: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            gripPosition: number;
        }, {
            gripPosition: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        moduleData?: any;
        type: string;
        modulePose: {
            gripPosition: number;
        };
    }, {
        moduleData?: any;
        type: string;
        modulePose: {
            gripPosition: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    ledState?: any;
    module: {
        moduleData?: any;
        type: string;
        modulePose: {
            gripPosition: number;
        };
    };
    name: string;
    status: "error" | "stopped" | "idle" | "moving";
    pose: {
        position: number[];
        quaternion: number[];
    };
    obstacles: {
        polygonVerticeCoordinates: number[][];
    }[];
    batteryStatus: {
        batteryPercentage: number;
        batteryLevel: "high" | "low" | "medium";
    };
}, {
    ledState?: any;
    module: {
        moduleData?: any;
        type: string;
        modulePose: {
            gripPosition: number;
        };
    };
    name: string;
    status: "error" | "stopped" | "idle" | "moving";
    pose: {
        position: number[];
        quaternion: number[];
    };
    obstacles: {
        polygonVerticeCoordinates: number[][];
    }[];
    batteryStatus: {
        batteryPercentage: number;
        batteryLevel: "high" | "low" | "medium";
    };
}>, "many">;
export type BotState = z.infer<typeof botStateSchema>;
export type AggregateBotState = z.infer<typeof aggregateBotStateSchema>;
export type CompositePose = z.infer<typeof compositePoseSchema>;
export type BotPose = z.infer<typeof botPoseSchema>;
