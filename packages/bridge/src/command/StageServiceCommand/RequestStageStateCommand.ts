import { Context } from "../../controller/Context";
import { ResponseMessage } from "schema";
import { ICommand } from "../ICommand";

export class RequestStageStateCommand implements ICommand {
    execute(context: Context): ResponseMessage {
        return {
            responseType: "success",
            message: "Stage state sent",
            responseData: context.getStageState(),
        };
    }
}
