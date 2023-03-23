import { PairingClient } from "../../../../bot_pairing_client/src";
import { Server } from "socket.io";
import { TopicServer } from "webtopics";
import { botParingService } from "schema";
export class botPairingServer{

    private pairingClient:PairingClient
    private botPairingWebTopicServer :TopicServer;
    private bridgeIPPort;
    

    constructor(){
        this.pairingClient= new PairingClient();
        this.botPairingWebTopicServer =new TopicServer(new Server(3000))
        this.bridgeIPPort="not found"
    }
    public runPairingService(){
        this.pairingClient.startAdvertise();

        this.botPairingWebTopicServer.srv(botParingService,(req)=>{
            this.bridgeIPPort=req.bridgeIp+":",req.bridgePort
            console.log(this.bridgeIPPort);
            
        })
    }

    //getter setter
    public getBotPairingWebTopicServer():TopicServer {
        return this.botPairingWebTopicServer;
    }

    public setBotPairingWebTopicServer(botPairingWebTopicServer:TopicServer): void {
        this.botPairingWebTopicServer = botPairingWebTopicServer;
    }

    public getPairingClient(): PairingClient {
        return this.pairingClient;
    }

    public setPairingClient(pairingClient: PairingClient): void {
        this.pairingClient = pairingClient;
    }
    
}
const dummybotPairingServer =  new botPairingServer()
dummybotPairingServer.runPairingService();
