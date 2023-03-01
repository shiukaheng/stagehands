import { Context } from "../../controller/Context";
import { ResponseMessage } from "schema";
import { ICommand } from "../ICommand";

export class RequestBotStateCommand implements ICommand {
    private botID: string;
    execute(context: Context): ResponseMessage {
        let tempBotState = context
            .getCurrentBotState()
            .find((botState: { name: string }) => botState.name === this.botID);
        if (tempBotState === undefined) {
            return {
                responseType: "error",
                message: `RequestBotStateCommand error: ${this.botID} not registered`,
            };
        }

        return {
            responseType: "success",
            message: `bot with ID ${this.botID} state sent`,
            responseData: tempBotState,
        };
    }
    constructor(botID: string) {
        this.botID = botID;
    }
}
