import { z } from "zod";
export var stageBoundarySchema = z.object({
    polygonVertexCoordinates: z.number().array().length(2).array()
});
