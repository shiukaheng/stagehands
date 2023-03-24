import { FleetState } from "schema";
import { Context } from "../controller/Context";

export function checkValidRecall(newFleetState: Record<string, { module: { type: string; state: { gripPosition: number } | null }; targetPose: { position: number[]; quaternion: number[] }; baseLEDState: { rgbValue: number[]; ledAnimation: { flashingFrequency?: number | undefined; animationMode: "constant" | "flashing" }}}>,context:Context):boolean {
    for (const botName in newFleetState) {
        if (context.getCurrentBotState.hasOwnProperty(botName)) {
            throw new Error(`Bot ${botName} does not exist`)
        } 
        else {
            // Check if the modules match
            const botState = context.getCurrentBotState()[botName]
            if (botState.module.type !== newFleetState[botName].module.type) {
                throw new Error(`Bot ${botName} has module type ${botState.module.type} but the state has module type ${newFleetState[botName].module.type}`)
            }
        }

    }
    return true;
}
// export function checkClientIDPresent(botName:string,context:Context):boolean{
//     if(context.getbotClientIDMap().get(botName)===undefined){
//         throw new Error(`Bot ${botName} does not connect to bridge`)
//     }
//     return true;
// }