import { Context } from "../../controller/Context";
import { BotState } from "../../../../schema";
import { ICommand } from "../ICommand";
export class UpdateBotCommand implements ICommand {
    private botState: BotState;
    constructor(newBotState: BotState) {
        this.botState = newBotState;
    }
    execute(
        context: Context
    ): void | { responseData?: any; responseType: string; message: string } {
        let botStateExist = false;
        for (let i = 0; i < context.getCurrentBotState().length; i++) {
            if (context.getCurrentBotState()[i].name === this.botState.name) {
                context.getCurrentBotState()[i] = this.botState;
                botStateExist = true;
            }
        }
        //botstate not found
        if (botStateExist === false) {
            context.getCurrentBotState().push(this.botState);
        }
    }
}
