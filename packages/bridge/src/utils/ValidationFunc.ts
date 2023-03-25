import { Context } from "../controller/Context";

// Why not use this? :
// import { FleetState } from "schema";

/**
 * Checks if a recall request is valid.
 * @param newFleetState - The new state of the fleet.
 * @param context - The context object.
 * @returns True if the recall request is valid, false otherwise.
 * @throws An error if the bot does not exist or if the module type does not match.
 */
export function checkValidRecall(newFleetState: Record<string, { module: { type: string; state: { gripPosition: number } | null }; targetPose: { position: number[]; quaternion: number[] }; baseLEDState: { rgbValue: number[]; ledAnimation: { flashingFrequency?: number | undefined; animationMode: "constant" | "flashing" } } }>, context: Context): boolean {
    for (const botName in newFleetState) {
        if (!context.getCurrentBotState().hasOwnProperty(botName)) {
            throw new Error(`Bot ${botName} does not exist`)
        } else {
            // Check if the modules match
            const botState = context.getCurrentBotState()[botName]
            if (botState.module.type !== newFleetState[botName].module.type) {
                throw new Error(`Bot ${botName} has module type ${botState.module.type} but the state has module type ${newFleetState[botName].module.type}`)
            }
        }
    }
    return true;
}