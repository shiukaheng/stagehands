import { aggregateBotState } from "../../../schema/src/bot/botState"
import { presetRecallStateLiteralSchema, stageBoundary, stageState } from "../../../schema/src/stage/stageState";
import { preset } from "../../../schema/src/stage/stageState";
export class Context {

    private currentBotState :aggregateBotState
    private targetBotState :aggregateBotState


    private stageState: stageState
    

    constructor(){
        this.currentBotState = []
        this.targetBotState = [];
        this.stageState = {
            obstacles:[],
            presets:[],
            activePreset:"NoActivePreset",
            presetRecallState:'idle' ,
            boundary:null as any
        }
    }
    public getCurrentBotState() :aggregateBotState {
        return this.currentBotState;
    }

    public setCurrentBotState(aggregatedBotState:aggregateBotState): void {
        this.currentBotState = aggregatedBotState;
    }

    public getStageState(): stageState {
        return this.stageState;
    }

    public setStageState(stageState: stageState): void {
        this.stageState = stageState;
    }
    public getTargetBotState() :aggregateBotState {
        return this.targetBotState;
    }

    public setTargetBotState(targetBotState :aggregateBotState): void {
        this.targetBotState = targetBotState;
    }

}