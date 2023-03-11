import { BotState, Pose } from "schema";

export class dummyBot{
    private botState:BotState;
    constructor(botID:string = "Untitled bot"){
        this.botState = {
            name: botID,
            pose: {
                position: [0, 0, 0],
                quaternion: [0, 0, 0, 1]
            },
            targetPose: {
                position: [0, 0, 0],
                quaternion: [0, 0, 0, 1]
            },
            ledState: {
                base: {
                    rgbValue: [0, 0, 0],
                    ledAnimation: {
                        animationMode: "constant",
                        flashingFrequency: 0
                    }
                }
            },
            status: "idle",
            module: {
                type: "nullModule",
                state: null,
                moduleModels: {}
            },
            stopped: false
        }
    }

    public moveTo(pose:Pose){
        this.botState.pose=pose;
    }

    
    public getBotState(): BotState {
        return this.botState;
    }

    public setBotState(botState: BotState): void {
        this.botState = botState;
    }

}