import { aggregateBotState } from "../../../schema/src/bot/botState"
import { stageState } from "../../../schema/src/stage/stageState";

export class Context {

    private currentBotState :aggregateBotState
    private targetBotState :aggregateBotState


    private stageState: stageState
    

    constructor(){
        this.currentBotState = null as any;
        this.targetBotState = null as any;
        this.stageState = null as any;
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