import { StageState, stageTopic } from "schema";
import { io } from "socket.io-client";
import { TopicClient } from "webtopics";

export class dummyWebClient{
    private stageState:StageState;
    private webClient:TopicClient;

    
    constructor(port:number=3000){
        this.webClient =new TopicClient(io(`http://localhost:${port}`))
        this.stageState={
            presets: [],
            activePreset: "NoActivePreset",
            presetRecallState: "idle",
            boundary: null as any,
        }

    }
    public  topicSub() {
        this.webClient.sub(stageTopic,(stageState)=>{
            this.stageState = stageState;
        })
    }
    public getStageState(): StageState {
        return this.stageState;
    }

    public setStageState(stageState: StageState): void {
        this.stageState = stageState;
    }

    public getWebClient(): TopicClient {
        return this.webClient;
    }

    public setWebClient(webClient: TopicClient): void {
        this.webClient = webClient;
    }

}