import { z } from "zod";
export declare const responseType: z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"success">]>;
export declare const responseMessageSchema: z.ZodObject<{
    responseType: z.ZodString;
    message: z.ZodString;
    responseData: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    responseData?: any;
    message: string;
    responseType: string;
}, {
    responseData?: any;
    message: string;
    responseType: string;
}>;
export type ResponseMessage = z.infer<typeof responseMessageSchema>;
