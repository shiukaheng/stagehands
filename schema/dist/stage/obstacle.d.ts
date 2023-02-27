import { z } from "zod";
export declare const obstacleSchema: z.ZodObject<{
    polygonVerticeCoordinates: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
}, "strip", z.ZodTypeAny, {
    polygonVerticeCoordinates: number[][];
}, {
    polygonVerticeCoordinates: number[][];
}>;
export type Obstacle = z.infer<typeof obstacleSchema>;
