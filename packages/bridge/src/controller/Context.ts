import { FleetState, StageState, BotConnectionStatus } from "schema";

import { TopicClient, TopicServer } from "webtopics";
import { Server } from "socket.io";
export class Context {
    private currentBotState: FleetState;
    private targetBotState: FleetState;
    private stageState: StageState;
    private server: TopicServer;
    private serverPort: number;

    public getServerPort(): number {
        return this.serverPort;
    }

    public setServerPort(serverPort: number): void {
        this.serverPort = serverPort;
    }

    public getServer(): TopicServer {
        return this.server;
    }

    public setServer(server: TopicServer): void {
        this.server = server;
    }


    //private botClientIDMap:Map<string,string>
    private botConnectionState: BotConnectionStatus[]
    private availableBotNameTopicCLientMap: Map<string, TopicClient>

    public getAvailableBotNameTopicCLientMap(): Map<string, TopicClient> {
        return this.availableBotNameTopicCLientMap;
    }

    public setAvailableBotNameTopicCLientMap(availableBotNameTopicCLientMap: Map<string, TopicClient>): void {
        this.availableBotNameTopicCLientMap = availableBotNameTopicCLientMap;
    }

    constructor(port: number = 2324) {
        this.currentBotState = {};
        this.targetBotState = {};
        this.botConnectionState = []
        this.server = new TopicServer(new Server(port, { cors: { origin: "*" } }));
        this.serverPort = port;
        this.availableBotNameTopicCLientMap = new Map<string, TopicClient>;

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
