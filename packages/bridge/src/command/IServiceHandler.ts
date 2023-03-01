import { ResponseMessage } from "../../../schema/src/serverResponse";
import { Context } from "../controller/Context";

export interface IServiceHandler {
    execute(context: Context): Promise<ResponseMessage | void>;
}
