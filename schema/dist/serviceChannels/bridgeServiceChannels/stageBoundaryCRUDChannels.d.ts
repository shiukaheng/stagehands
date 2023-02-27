import { z } from "zod";
export declare const createStageBoundaryRequestSchema: z.ZodObject<{
    stageBoundaryId: z.ZodString;
    stageBoundary: z.ZodObject<{
        polygonVertexCoordinates: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
    }, "strip", z.ZodTypeAny, {
        polygonVertexCoordinates: number[][];
    }, {
        polygonVertexCoordinates: number[][];
    }>;
}, "strip", z.ZodTypeAny, {
    stageBoundaryId: string;
    stageBoundary: {
        polygonVertexCoordinates: number[][];
    };
}, {
    stageBoundaryId: string;
    stageBoundary: {
        polygonVertexCoordinates: number[][];
    };
}>;
export declare const updateStageBoundaryRequestSchema: z.ZodObject<{
    stageBoundaryId: z.ZodString;
    stageBoundary: z.ZodObject<{
        polygonVertexCoordinates: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
    }, "strip", z.ZodTypeAny, {
        polygonVertexCoordinates: number[][];
    }, {
        polygonVertexCoordinates: number[][];
    }>;
}, "strip", z.ZodTypeAny, {
    stageBoundaryId: string;
    stageBoundary: {
        polygonVertexCoordinates: number[][];
    };
}, {
    stageBoundaryId: string;
    stageBoundary: {
        polygonVertexCoordinates: number[][];
    };
}>;
export declare const deleteStageBoundaryRequestSchema: z.ZodObject<{
    stageBoundaryId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    stageBoundaryId: string;
}, {
    stageBoundaryId: string;
}>;
export declare const createStageBoundaryServiceChannel: import("webtopics/dist/utils/Channel").ServiceChannel<{
    stageBoundaryId: string;
    stageBoundary: {
        polygonVertexCoordinates: number[][];
    };
}, {
    responseData?: any;
    message: string;
    responseType: string;
}>;
export declare const updateStageBoundaryServiceChannel: import("webtopics/dist/utils/Channel").ServiceChannel<{
    stageBoundaryId: string;
    stageBoundary: {
        polygonVertexCoordinates: number[][];
    };
}, {
    responseData?: any;
    message: string;
    responseType: string;
}>;
export declare const deleteStageBoundaryServiceChannel: import("webtopics/dist/utils/Channel").ServiceChannel<{
    stageBoundaryId: string;
}, {
    responseData?: any;
    message: string;
    responseType: string;
}>;
export type CreateStageBoundaryRequest = z.infer<typeof createStageBoundaryRequestSchema>;
export type UpdateStageBoundaryRequest = z.infer<typeof createStageBoundaryRequestSchema>;
export type DeleteStageBoundaryRequest = z.infer<typeof createStageBoundaryRequestSchema>;
