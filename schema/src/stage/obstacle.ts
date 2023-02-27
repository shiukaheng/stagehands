
import { z } from "zod";

export const obstacleSchema = z.object({
    polygonVerticeCoordinates: z.number().array().length(2).array(), // assuming obstacle would be polygon
});

export type Obstacle = z.infer<typeof obstacleSchema>;