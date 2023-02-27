import { z } from "zod";

export const joystickStateSchema = z.object({
    x: z.number(),
    y: z.number(),
    in_use_by: z.string().nullable(),
})

export type JoystickState = z.infer<typeof joystickStateSchema>;