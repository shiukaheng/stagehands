import {z} from "zod"
import { responseMessageSchema } from "../../serverResponse";
import {createService} from "webtopics"
import { stageBoundarySchema } from "../../stage/stageState";
export const createStageBoundaryRequestSchema = z.object({
    stageBoundaryId:z.string(),
    stageBoundary:stageBoundarySchema
})

export const updateStageBoundaryRequestSchema = z.object({
    stageBoundaryId:z.string(),
    stageBoundary:stageBoundarySchema
})

export const deleteStageBoundaryRequestSchema = z.object({
    stageBoundaryId:z.string(),
})

export const createStageBoundaryServiceChannel = createService(
    "createStageBoundary",
    createStageBoundaryRequestSchema,
    responseMessageSchema
)

export const updateStageBoundaryServiceChannel = createService(
    "createStageBoundary",
    updateStageBoundaryRequestSchema,
    responseMessageSchema
)

export const deleteStageBoundaryServiceChannel = createService(
    "createStageBoundary",
    deleteStageBoundaryRequestSchema,
    responseMessageSchema
)

export type CreateStageBoundaryRequest =z.infer <typeof createStageBoundaryRequestSchema>
export type UpdateStageBoundaryRequest =z.infer <typeof createStageBoundaryRequestSchema>
export type DeleteStageBoundaryRequest =z.infer <typeof createStageBoundaryRequestSchema>
    

