import { type } from "os";
import { FleetState,presetRecallStateLiteralSchema,StageBoundary,StageState,BotConnectionStatus } from "schema";

import { Preset } from "schema";
import { TopicClient } from "webtopics";

/**
 * Context class to store the current state of the bridge
 */
export class Context {
    private currentBotState: FleetState;
    private targetBotState: FleetState;
    private stageState: StageState;
    //private botClientIDMap:Map<string,string>
    private botConnectionState:BotConnectionStatus[]
    private availableBotTopicClientMap:Map<string,TopicClient>
    //private server:TopicServer;
    constructor() {
        this.currentBotState ={};
        this.targetBotState = {};
        this.botConnectionState=[]
        this.availableBotTopicClientMap=new Map<string,TopicClient>();
        this.stageState = {
            presets: [],
            activePreset: "NoActivePreset",
            presetRecallState: "idle",
            boundary: {
                polygonVertexCoordinates: []
            },
        };
        //this.botClientIDMap=new Map<string,string>();


    }
    public getAvailableBotTopicClientMap():Map<string,TopicClient>{
        return this.availableBotTopicClientMap;
    }
    public setAvailableBotTopicClientMap(availableBotTopicClientMap:Map<string,TopicClient>):void{
        this.availableBotTopicClientMap=availableBotTopicClientMap;
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
    // public getbotClientIDMap(): Map<string,string>{
    //     return this.botClientIDMap;
    // }

    public setTargetBotState(targetBotState: FleetState): void {
        this.targetBotState = targetBotState;
    }
    public getTargetBotState(): FleetState {
        return this.targetBotState;
    }

    public getBotConnectionState(): BotConnectionStatus[] {
        return this.botConnectionState;
    }

    public setBotConnectionState(domainNameList: BotConnectionStatus[]): void {
        this.botConnectionState = domainNameList;
    }
    

}
