import { botIDRegistrationService, BotState, clearStopService, fleetTopic, LEDOverwriteService, Pose, recallBotStateService, restoreLEDService, stopService } from "schema";
import { io } from "socket.io-client";
import{ServiceChannel, TopicClient} from "webtopics";
import { cloneDeep } from "lodash";
export class dummyBotClient{
    private currentBotState:BotState;
    private targetBotState:BotState;
    private botClient:TopicClient;
    
    constructor(botID:string = "Untitled bot",port:number=3000){
        this.botClient =new TopicClient(io(`http://localhost:${port}`))
        this.currentBotState = {
            name: botID,
            pose: {
                position: [0, 0, 0],
                quaternion: [0, 0, 0, 1]
            },
            targetPose: {
                position: [0, 0, 0],
                quaternion: [0, 0, 0, 1]
            },
            ledState: {
                base: {
                    rgbValue: [0, 0, 0],
                    ledAnimation: {
                        animationMode: "constant",
                        flashingFrequency: 0
                    }
                }
            },
            status: "idle",
            module: {
                type: "nullModule",
                state: null,
                moduleModels: {}
            },
            stopped: false
        }
        this.targetBotState=cloneDeep(this.currentBotState);
    }

    public moveTo(pose:Pose){
        this.currentBotState.pose=pose;
    }
    public runBotServices(){
        this.botClient.srv(recallBotStateService, (req)=>
        {
           this.targetBotState.targetPose = req.targetPose;
           this.targetBotState.module.state = req.module.state;
           this.targetBotState.ledState.base=req.baseLEDState;

        })   
        this.botClient.srv(stopService,(req)=>{
            this.targetBotState.stopped=true;
        })

        this.botClient.srv(clearStopService,(req)=>{
            this.targetBotState.stopped=false;
        })

        this.botClient.srv(LEDOverwriteService,(req)=>{
            this.targetBotState.ledState.systemOverride=req;
        })

        this.botClient.srv(restoreLEDService,(req)=>{
            this.targetBotState.ledState.systemOverride=undefined;
        })
        this.botClient.srv(botIDRegistrationService,(req)=>{
            return this.currentBotState.name;
        })
        
        }
    
    public topicPub(){
        setInterval(()=>{
            const botID = this.targetBotState.name;
            this.botClient.pub(fleetTopic,{botID:this.currentBotState})
        },50)
    }
        
        

    public getCurrentBotState(): BotState {
        return this.currentBotState;
    }

    public setCurrentBotState(botState: BotState): void {
        this.currentBotState = botState;
    }

}