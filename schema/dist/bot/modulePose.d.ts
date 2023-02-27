import { z } from "zod";
export declare const modulePoseSchema: z.ZodObject<{
    gripPosition: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    gripPosition: number;
}, {
    gripPosition: number;
}>;
export declare const moduleStateSchema: z.ZodObject<{
    type: z.ZodString;
    moduleData: z.ZodAny;
    modulePose: z.ZodObject<{
        gripPosition: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        gripPosition: number;
    }, {
        gripPosition: number;
    }>;
}, "strip", z.ZodTypeAny, {
    moduleData?: any;
    type: string;
    modulePose: {
        gripPosition: number;
    };
}, {
    moduleData?: any;
    type: string;
    modulePose: {
        gripPosition: number;
    };
}>;
export type ModulePose = z.infer<typeof modulePoseSchema>;
export type ModuleState = z.infer<typeof moduleStateSchema>;
