import { BotPose, CompositePose, BotState } from "../../../../schema/dist";
import { Context } from "../../controller/Context";
import { ResponseMessage } from "../../../../schema/dist";
import { ICommand } from "../ICommand";

export class MoveBotToPoseCommand implements ICommand {
    private botPose: BotPose;
    private botID: string;
    constructor(botID: string, botPose: BotPose) {
        this.botID = botID;
        this.botPose = botPose;
    }
    execute(context: Context): ResponseMessage {
        let tempBotState = context
            .getTargetBotState()
            .find((botState: { name: string }) => botState.name === this.botID);

        if (tempBotState === undefined) {
            return {
                responseType: "error",
                message: `MoveBotToPoseCommand error: ${this.botID} not registered`,
            };
        }

        if (tempBotState.status === "error") {
            return {
                responseType: "error",
                message: `${this.botID} not functioning`,
            };
        }

        
        tempBotState.pose = this.botPose;
        
        return {
            responseType: "success",
            message: `${this.botID} move to ${JSON.stringify(this.botPose)}`,
        };
    }
}
