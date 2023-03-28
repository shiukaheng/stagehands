import { format } from "path";
import { botPairingService, BotState, fleetTopic, recallBotStateService } from "schema";
import { Server } from "socket.io";
import {io} from "socket.io-client"
import { TopicClient, TopicServer } from "webtopics";
import { PairingClient } from "utils";
import{createNewBotState} from "./utils"
export class simulatedBotClient{
    private pairingClient:PairingClient
    private bridgeIPPort:string;
    private botState:BotState;
    private connectionStatus:boolean;
    private botClinet:TopicClient = null as any;
    private botVelocity = 0.1
    private botPoseTolerance = 0.01
    private simulationFrameRate = 60
   
    constructor(){
        this.pairingClient= new PairingClient();
        //this.socketServer =new Server(3435);
        
        this.botState=createNewBotState({});
        this.bridgeIPPort=null as any
        this.connectionStatus=false;
        
    }
    public testBridgeConnection(bridgeIPPort:string){
        const testSocket = io(bridgeIPPort);
        testSocket.on("connect",()=>{
            console.log("connecting");
            
            this.bridgeIPPort=bridgeIPPort;
            this.botClinet = new TopicClient(testSocket);
            this.connectToBridge(this.botClinet);

        })
    }
    public runPairingService(){
        
        this.pairingClient.startAdvertise();
        this.pairingClient.subscribeRequest(({bridgeIp,bridgePort})=>{
            const bridgeIPPort="http://"+bridgeIp+":"+bridgePort.toString()
            console.log(bridgeIPPort);
            this.testBridgeConnection(bridgeIPPort)
            
            //console.log(this.bridgeIPPort);
        })

    }
    public connectToBridge(client:TopicClient){
        const clientID = client.id;
        this.connectionStatus=true;
        
        
        const timer = setInterval(() => {
            this.update(1/this.simulationFrameRate)
        }, 1000/this.simulationFrameRate)
        
    }
    public update(dt: number) {

        const botState = this.botState;
        if (botState.stopped !== true) {
            const targetPose = botState.targetPose;
            const botPose = botState.pose;
            const posDiff = [targetPose.position[0] - botPose.position[0], targetPose.position[1] - botPose.position[1], targetPose.position[2] - botPose.position[2]];
            const posDiffMag = Math.sqrt(posDiff[0] ** 2 + posDiff[1] ** 2 + posDiff[2] ** 2);
            const posDirection = posDiff.map((val)=>{
                if(Math.abs(val)<this.botPoseTolerance){return 0}else{
                if(val<0){return -1}else{
                    return 1
                }}})
            if (posDiffMag > this.botPoseTolerance) {
                // Move the bot
                const newPos = [botPose.position[0] + posDirection[0]* 20 *this.botVelocity * dt, botPose.position[1] , botPose.position[2] + posDirection[2]*20* this.botVelocity * dt];
                this.botState.pose.position = newPos;
                this.botState.status = "moving"
            } else {
                this.botState.status = "idle"
            }
        }
        this.botClinet.pub(fleetTopic, {clientID:this.botState});
    }


}
const dummybotClient =  new simulatedBotClient()
dummybotClient.runPairingService();

