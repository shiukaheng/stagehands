import { Context } from "../controller/Context"
import { responseMessage } from "../utils/responseMessage"
export interface ICommand{
    execute(context:Context):responseMessage|void
}