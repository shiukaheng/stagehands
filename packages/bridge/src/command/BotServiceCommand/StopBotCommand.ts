import { Context } from "../../controller/Context";
import { ResponseMessage } from "schema";
import { ICommand } from "../ICommand";

export class StopBotCommand implements ICommand {
    private botID: string;
    execute(context: Context): ResponseMessage {
        let tempBotState = context
            .getTargetBotState()
            .find((botState: { name: string }) => botState.name === this.botID);
        if (tempBotState === undefined) {
            return {
                responseType: "error",
                message: `StopBotCommand error: ${this.botID} not registered`,
            };
        }
        tempBotState.status = "stopped";
        return {
            responseType: "success",
            message: `stopping ${this.botID}`,
        };
    }
    constructor(botID: string) {
        this.botID = botID;
    }
}
