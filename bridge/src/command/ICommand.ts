import { ResponseMessage } from "../../../schema/src/serverResponse"
import { Context } from "../controller/Context"

export interface ICommand{
    execute(context:Context):ResponseMessage |void
}