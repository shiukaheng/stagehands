import { Context } from "./context";
import { ICommand } from "../command/ICommand";
export class Controller {
    private context: Context;
    constructor() {
        this.context = new Context();
    }
    public runCommand(command: ICommand): void {
        command.execute(this.context);
    }
}
