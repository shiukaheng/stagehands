
import { FleetState, fleetTopic, StageState, stageTopic,getRecallFleetState,Preset, createPresetService, UpdatePresetRequest} from "schema";
import { io } from "socket.io-client";
import { TopicClient} from "webtopics";

export class dummyWebClient{
    private stageState:StageState;
    private webClient:TopicClient;
    private currentBotState:FleetState;
    
    constructor (port:number=3001){
        this.webClient =new TopicClient(io(`http://localhost:${port}`))
        this.currentBotState={}
        this.stageState={
            presets: [],
            activePreset: "NoActivePreset",
            presetRecallState: "idle",
            boundary: {
                polygonVertexCoordinates: []
            },
        }

    }
    public topicSub() {
        this.webClient.sub(fleetTopic,(fleet)=>{
            this.currentBotState=fleet
        })
        this.webClient.sub(stageTopic,(stageState)=>{

            this.stageState = stageState;
        })
    }
    public async setPreset(presetName:string){
        const preset:Preset ={name:presetName,state:getRecallFleetState(this.currentBotState)}
        const serverId =await this.webClient.getServerID()
        this.webClient.req(createPresetService,serverId,preset)
    }
    public async updatePreset(presetID:string){
        
        // const updatePresetRequest:UpdatePresetRequest= {presetId:presetName,preset:{

        // }}
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