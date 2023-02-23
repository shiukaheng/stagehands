import { AggregateBotState } from "../../../schema/src/bot/botState";
import {
    presetRecallStateLiteralSchema,
    StageBoundary,
    StageState,
} from "../../../schema";
import { Preset } from "../../../schema";
export class Context {
    private currentBotState: AggregateBotState;
    private targetBotState: AggregateBotState;
    private stageState: StageState;
    private botClientIDMap:Map<string,string>
    private webClientIDMap:Map<string,string>
    constructor() {
        this.currentBotState = [];
        this.targetBotState = [];
        this.stageState = {
            obstacles: [],
            presets: [],
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
    public getTargetBotState(): AggregateBotState {
        return this.targetBotState;
    }

    public setTargetBotState(targetBotState: AggregateBotState): void {
        this.targetBotState = targetBotState;
    }
}
