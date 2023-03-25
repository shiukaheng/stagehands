import { PairingClient } from "../../../../utils/src/discovery"
import { Server } from "socket.io";
import { TopicServer } from "webtopics";
import { botParingService } from "schema";
export class botPairingServer{

    private pairingClient:PairingClient
    private botPairingWebTopicServer :TopicServer;
    private bridgeIPPort;
    private socketServer;

    constructor(){
        this.pairingClient= new PairingClient();
        this.socketServer =new Server(3535);
        this.botPairingWebTopicServer =new TopicServer(this.socketServer)
        this.bridgeIPPort="not found"
    }
    public runPairingService(){
        this.pairingClient.startAdvertise();
        
        this.botPairingWebTopicServer.srv(botParingService,(req)=>{
            this.bridgeIPPort=req.bridgeIp+":"+req.bridgePort
            console.log("connection established");
            
            console.log(this.bridgeIPPort);
            
        })
        // process.on("SIGINT",()=>{
        //     console.log('Received SIGINT. Stopping Socket.IO server...');
        //     this.socketServer.close(()=>{
        //         console.log('Socket.IO server stopped.');
        //         process.exit();
        //     })
        // })
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
