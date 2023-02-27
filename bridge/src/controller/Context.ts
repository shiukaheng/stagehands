import { AggregateBotState,presetRecallStateLiteralSchema,StageBoundary,StageState } from "@schema/dist";

import { Preset } from "../../../schema";
export class Context {
    private currentBotState: AggregateBotState;
    private targetBotState: AggregateBotState;
    private stageState: StageState;
    private botClientIDMap:Map<string,string>
    private webClientIDMap:Map<string,string>
    constructor() {
        this.currentBotState ={};
        this.targetBotState = {};
        this.stageState = {
            obstacles: [],
            presets: {},
            activePreset: "NoActivePreset",
            presetRecallState: "idle",
            boundary: null as any,
        };
        this.botClientIDMap=new Map<string,string>();
        this.webClientIDMap=new Map<string,string>();
    }
    public getCurrentBotState(): AggregateBotState {
        return this.currentBotState;
    }

    public setCurrentBotState(aggregatedBotState: AggregateBotState): void {
        this.currentBotState = aggregatedBotState;
    }

    public getStageState(): StageState {
        return this.stageState;
    }

    public setStageState(stageState: StageState): void {
        this.stageState = stageState;
    }
    public getbotClientIDMap(): Map<string,string>{
        return this.botClientIDMap;
    }
    public getwebClientIDMap(): Map<string,string>{
        return this.webClientIDMap;
    }

    public setTargetBotState(targetBotState: AggregateBotState): void {
        this.targetBotState = targetBotState;
    }
    public getTargetBotState(): AggregateBotState {
        return this.targetBotState;
    }

}
