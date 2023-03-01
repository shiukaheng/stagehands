import { Context } from "../../controller/Context";
import { ResponseMessage } from "schema";
import { ICommand } from "../ICommand";

export class RequestAllBotStateCommand implements ICommand {
    execute(context: Context): ResponseMessage {
        return {
            responseType: "success",
            message: "All bot states sent",
            responseData: context.getCurrentBotState(),
        };
    }
}
