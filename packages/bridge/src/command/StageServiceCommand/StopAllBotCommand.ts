import { Context } from "../../controller/Context";
import { ResponseMessage } from "schema";
import { ICommand } from "../ICommand";

export class StopAllBotCommand implements ICommand {
    execute(context: Context): ResponseMessage {
        context.getTargetBotState().forEach((botState: { status: string }) => {
            botState.status = "stopped";
        });

        return {
            responseType: "success",
            message: "stopping all bots",
        };
    }
}
