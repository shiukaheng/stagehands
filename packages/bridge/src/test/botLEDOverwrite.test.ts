import { describe,beforeAll,expect,test,jest} from "@jest/globals";
import { clearBotLEDOverwriteService, clearLEDOverwriteService, LEDState, OverWriteBotLEDRequest, overWriteBotLEDService, overWriteLEDService } from "schema";
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
    
    const testledState1 :LEDState={
        rgbValue: [255, 255, 255],
        ledAnimation: {
            animationMode: "constant",
            flashingFrequency: 0
        }
    }
    test("overWriteBot1LEDTest",(done)=>{
        setTimeout(() => {
            const overWriteBot1LEDRequest:OverWriteBotLEDRequest = {botID:"1",ledState:testledState1}
            dummyWebClient1.getWebClient().req(overWriteBotLEDService,serverID,overWriteBot1LEDRequest)
            .then(()=>{
                
                expect(dummyBot1Client.getTargetBotState().ledState.systemOverride).toEqual(testledState1)
                done()
            })
            .catch((error)=>{
                done(error)
            })
        }, 1000);
    })
    test("clearBot1LEDoOverWriteTest",(done)=>{
        setTimeout(() => {
            dummyWebClient1.getWebClient().req(clearBotLEDOverwriteService,serverID,"1")
            .then(()=>{
                
                expect(dummyBot1Client.getTargetBotState().ledState.systemOverride).toEqual(undefined)
                done()
            })
            .catch((error)=>{
                done(error)
            })
        }, 1500);
    })
    test("overWriteAllBotLedTest",(done)=>{
        setTimeout(() => {
            dummyWebClient1.getWebClient().req(overWriteLEDService,serverID,testledState1)
            .then(()=>{
                
                expect(dummyBot1Client.getTargetBotState().ledState.systemOverride).toEqual(testledState1)
                expect(dummyBot2Client.getTargetBotState().ledState.systemOverride).toEqual(testledState1)
                done()
            })
            .catch((error)=>{
                done(error)
            })
        }, 2000);
    })
    test("clearAllBotLeOverWriteTest",(done)=>{
        setTimeout(() => {
            dummyWebClient1.getWebClient().req(clearLEDOverwriteService,serverID)
            .then(()=>{
                
                expect(dummyBot1Client.getTargetBotState().ledState.systemOverride).toEqual(undefined)
                expect(dummyBot2Client.getTargetBotState().ledState.systemOverride).toEqual(undefined)
                done()
            })
            .catch((error)=>{
                done(error)
            })
        }, 2000);
    })
})