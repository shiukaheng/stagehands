import { type } from "os";
import { FleetState,presetRecallStateLiteralSchema,StageBoundary,StageState } from "schema";

import { Preset } from "schema";
import { TopicClient } from "webtopics";
export type DomainNameConnectionState ={
    domainName:string,
    connectionStatus:"connected"|"disconnected"
}
export class Context {
    private currentBotState: FleetState;
    private targetBotState: FleetState;
    private stageState: StageState;
    private botClientIDMap:Map<string,string>
    private domainnameTopicClientMap:Map<string,TopicClient>
    private domainnameIpMap:Map<string,string>

    public getDomainnameIpMap(): Map<string,string> {
        return this.domainnameIpMap;
    }

    public setDomainnameIpMap(domainnameIpMap: Map<string,string>): void {
        this.domainnameIpMap = domainnameIpMap;
    }


    public getDomainnameTopicClientMap(): Map<string,TopicClient> {
        return this.domainnameTopicClientMap;
    }

    public setDomainnameTopicClientMap(domainnameTopicClientMap: Map<string,TopicClient>): void {
        this.domainnameTopicClientMap = domainnameTopicClientMap;
    }

    private domainNameConnectionState:DomainNameConnectionState[]

    


    constructor() {
        this.currentBotState ={};
        this.targetBotState = {};
        this.domainNameConnectionState=[]
        this.domainnameIpMap=new Map<string,string>
        this.domainnameTopicClientMap=new Map<string,TopicClient>;
        this.stageState = {
            presets: [],
            activePreset: "NoActivePreset",
            presetRecallState: "idle",
            boundary: {
                polygonVertexCoordinates: []
            },
        };
        this.botClientIDMap=new Map<string,string>();


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

    public setTargetBotState(targetBotState: FleetState): void {
        this.targetBotState = targetBotState;
    }
    public getTargetBotState(): FleetState {
        return this.targetBotState;
    }

    public getdomainNameConnectionState(): DomainNameConnectionState[] {
        return this.domainNameConnectionState;
    }

    public setdomainNameConnectionState(domainNameList: DomainNameConnectionState[]): void {
        this.domainNameConnectionState = domainNameList;
    }
    

}
