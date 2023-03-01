import { z } from "zod";

export const stageBoundarySchema = z.object({
    polygonVertexCoordinates: z.number().array().length(2).array(), // assuming stageBoundary would be polygon
});

export type StageBoundary = z.infer<typeof stageBoundarySchema>;