import { FleetState,presetRecallStateLiteralSchema,StageBoundary,StageState } from "schema";

import { Preset } from "schema";
export class Context {
    private currentBotState: FleetState;
    private targetBotState: FleetState;
    private stageState: StageState;
    private botClientIDMap:Map<string,string>
    private webClientIDMap:Map<string,string>
    constructor() {
        this.currentBotState ={};
        this.targetBotState = {};
        this.stageState = {
            presets: {},
            activePreset: "NoActivePreset",
            presetRecallState: "idle",
            boundary: null as any,
        };
        this.botClientIDMap=new Map<string,string>();
        this.webClientIDMap=new Map<string,string>();
    }
    public getCurrentBotState(): FleetState {
        return this.currentBotState;
    }

    public setCurrentBotState(aggregatedBotState: FleetState): void {
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

    public setTargetBotState(targetBotState: FleetState): void {
        this.targetBotState = targetBotState;
    }
    public getTargetBotState(): FleetState {
        return this.targetBotState;
    }

}
