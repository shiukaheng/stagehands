import { z } from "zod";
export declare const micStandDataSchema: z.ZodObject<{
    gripPosition: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    gripPosition: number;
}, {
    gripPosition: number;
}>;
export type MicStandData = z.infer<typeof micStandDataSchema>;
export declare const nullModuleDataSchema: z.ZodNull;
export type NullModuleData = z.infer<typeof nullModuleDataSchema>;
export declare const moduleDataSchema: z.ZodUnion<[z.ZodObject<{
    gripPosition: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    gripPosition: number;
}, {
    gripPosition: number;
}>, z.ZodNull]>;
export type ModuleData = z.infer<typeof moduleDataSchema>;
export declare const moduleTypeLiteralsSchema: z.ZodUnion<[z.ZodLiteral<"micStand">, z.ZodLiteral<"nullModule">]>;
export type ModuleType = z.infer<typeof moduleTypeLiteralsSchema>;
export declare const moduleTypeToDataSchema: Record<ModuleType, z.ZodTypeAny>;
export declare const moduleModelsSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
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
export type ModuleModels = z.infer<typeof moduleModelsSchema>;
export declare const moduleStateSchema: z.ZodEffects<z.ZodObject<{
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
export type ModuleState = z.infer<typeof moduleStateSchema>;
