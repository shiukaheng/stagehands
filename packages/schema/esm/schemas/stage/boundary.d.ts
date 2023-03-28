import { z } from "zod";
export declare const stageBoundarySchema: z.ZodObject<{
    polygonVertexCoordinates: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
}, "strip", z.ZodTypeAny, {
    polygonVertexCoordinates: number[][];
}, {
    polygonVertexCoordinates: number[][];
}>;
export type StageBoundary = z.infer<typeof stageBoundarySchema>;
