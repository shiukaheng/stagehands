import { describe,beforeAll,expect,test,jest} from "@jest/globals";
import { emergencyStopClearService, emergencyStopService, stopBotClearService, stopBotService } from "schema";
import { Controller } from "src/controller/Controller";
import { BridgeServer } from "../server";
import { dummyBotClient } from "./utils/dummyBotClient";
import { dummyWebClient } from "./utils/dummyWebClient";

describe("emergencyStopTest",()=>{
    let server:BridgeServer
    let controller:Controller
    let dummyBot1Client:dummyBotClient
    let dummyBot2Client:dummyBotClient
    let dummyWebClient1:dummyWebClient
    let serverID :string;
    beforeAll(async ()=>{
        server = new BridgeServer();
        controller = server.getController();
        dummyBot1Client = new dummyBotClient("1");
        dummyBot2Client = new dummyBotClient("2");
        dummyWebClient1 = new dummyWebClient();
        
        dummyWebClient1.topicSub();
        dummyBot1Client.registerID();
        dummyBot2Client.registerID();
        dummyBot1Client.runBotServices()
        dummyBot2Client.runBotServices()
        setTimeout(async() => {
            dummyBot1Client.topicPub();
            dummyBot2Client.topicPub();

        }, 500);
        serverID = await dummyWebClient1.getWebClient().getServerID();
    })
    test("stopBot1Test",(done)=>{
        setTimeout(() => {
            dummyWebClient1.getWebClient().req(stopBotService,serverID,"1")
            .then(()=>{
                expect(dummyBot1Client.getTargetBotState().stopped).toEqual(true);
                done()
            })
            .catch((error)=>{
                done(error)
            })
        }, 1000);

    })
    test("clearBot1StopTest",(done)=>{
        setTimeout(() => {
            dummyWebClient1.getWebClient().req(stopBotClearService,serverID,"1")
            .then(()=>{
                expect(dummyBot1Client.getTargetBotState().stopped).toEqual(false);
                done()
            })
            .catch((error)=>{
                done(error)
            })
        }, 1500);

    })

    test("emergencyStopAllBotTest",(done)=>{
        setTimeout(() => {
            dummyWebClient1.getWebClient().req(emergencyStopService,serverID)
            .then(()=>{
                expect(dummyBot1Client.getTargetBotState().stopped).toEqual(true);
                expect(dummyBot2Client.getTargetBotState().stopped).toEqual(true);
                done()
            })
            .catch((error)=>{
                done(error)
            })
        }, 2000);

    })
    test("clearEmergencyStopAllBotTest",(done)=>{
        setTimeout(() => {
            dummyWebClient1.getWebClient().req(emergencyStopClearService,serverID)
            .then(()=>{
                expect(dummyBot1Client.getTargetBotState().stopped).toEqual(false);
                expect(dummyBot2Client.getTargetBotState().stopped).toEqual(false);
                done()
            })
            .catch((error)=>{
                done(error)
            })
        }, 2500);

    })

})