import { Context } from "../controller/Context"
export interface ICommand{
    execute(context:Context):void
}