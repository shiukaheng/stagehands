import { aggregateBotState } from "../../../schema/src/bot/botState"
import { stageState } from "../../../schema/src/stage/stageState";

export class Context {

    private aggregatedBotState :aggregateBotState
    private stageState: stageState

    constructor(){
        this.aggregatedBotState = null as any;
        this.stageState = null as any;
    }
    public getAggregatedBotState() :aggregateBotState {
        return this.aggregatedBotState;
    }

    public setAggregatedBotState(aggregatedBotState:aggregateBotState): void {
        this.aggregatedBotState = aggregatedBotState;
    }

    public getStageState(): stageState {
        return this.stageState;
    }

    public setStageState(stageState: stageState): void {
        this.stageState = stageState;
    }

}