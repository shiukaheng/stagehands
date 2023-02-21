import { AggregateBotState } from "../../../schema/src/bot/botState"
import { presetRecallStateLiteralSchema, StageBoundary, StageState } from "../../../schema/src/stage/stageState";
import { Preset } from "../../../schema/src/stage/stageState";
export class Context {

    private currentBotState :AggregateBotState
    private targetBotState :AggregateBotState


    private stageState: StageState
    

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
    public getCurrentBotState() :AggregateBotState {
        return this.currentBotState;
    }

    public setCurrentBotState(aggregatedBotState:AggregateBotState): void {
        this.currentBotState = aggregatedBotState;
    }

    public getStageState(): StageState {
        return this.stageState;
    }

    public setStageState(stageState: StageState): void {
        this.stageState = stageState;
    }
    public getTargetBotState() :AggregateBotState {
        return this.targetBotState;
    }

    public setTargetBotState(targetBotState :AggregateBotState): void {
        this.targetBotState = targetBotState;
    }

}