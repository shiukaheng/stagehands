import { BotState } from "schema";

function randomColor(): [number, number, number] {
    return [Math.random(), Math.random(), Math.random()]
}

export function createNewBotState(state: Partial<BotState>): BotState {
    const base: BotState = {
        name: "Untitled bot",
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
                rgbValue: randomColor(),
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
    return {...base, ...state};
}