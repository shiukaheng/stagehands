import { z } from "zod";
export declare const joystickStateSchema: z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
    in_use_by: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    x: number;
    y: number;
    in_use_by: string | null;
}, {
    x: number;
    y: number;
    in_use_by: string | null;
}>;
export type JoystickState = z.infer<typeof joystickStateSchema>;
