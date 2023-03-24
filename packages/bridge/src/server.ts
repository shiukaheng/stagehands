import { serverMetaChannel, TopicServer } from "webtopics"
import { Server } from "socket.io"
import { FleetState, PresetSet, StageState, createPresetService, deletePresetService, emergencyStopClearService, emergencyStopService, fleetTopic, recallBotStateService, recallFleetStateService, stageTopic, stopBotClearService, updatePresetService, stopBotService, reorderPresetsService, runPresetService, overWriteBotLEDService, clearBotLEDOverwriteService, overWriteLEDService, clearLEDOverwriteService } from "schema"
import { z } from "zod"
import { ServiceChannel } from "webtopics/dist/utils/Channel"
import { v4 } from "uuid"
import { Controller } from "./controller/Controller"
import { clearBotLEDOverwriteServiceHandler, clearLEDOverwriteServiceHandler, CreatePresetServiceHandler, DeletePresetServiceHandler, EmergencyStopClearServiceHandler, EmergencyStopServiceHandler, overWriteBotLEDServiceHandler, overWriteLEDServiceHandler, RecallFleetStateServiceHandler, reorderPresetsServiceHandler, runPresetServiceHandler, StopBotClearServiceHandler, StopBotServiceHandler, UpdatePresetServiceHandler } from "./serviceHandlers"
import { fleetTopicHandler } from "./topicHandler"


export class bridgeServer{
    private controller:Controller;
    constructor(){
        this.controller =  new Controller(3001);
        //publish fleet topic
        this.controller.serverPub(stageTopic);
        //register new botClient with its botID
        //controller.serverSub(serverMetaChannel,newBotClientRegistrationHandler);
        this.controller.serverSub(fleetTopic,fleetTopicHandler);
        //register bot client ID
        //this.controller.runService(registerBotClientIDService,registerBotClientIDServiceHandler);
        //create preset service
        this.controller.runService(createPresetService,CreatePresetServiceHandler);
        //update preset service
        this.controller.runService(updatePresetService,UpdatePresetServiceHandler);
        //delete preset service
        this.controller.runService(deletePresetService,DeletePresetServiceHandler);
        //emergency stop service
        this.controller.runService(emergencyStopService,EmergencyStopServiceHandler);
        //emergency stop clear service
        this.controller.runService(emergencyStopClearService,EmergencyStopClearServiceHandler);
        //stop particular bot service
        this.controller.runService(stopBotService,StopBotServiceHandler);
        //clear particular bot stop service
        this.controller.runService(stopBotClearService,StopBotClearServiceHandler);
        //recall fleet state service
        this.controller.runService(recallFleetStateService,RecallFleetStateServiceHandler);
        //Reorder presets service
        this.controller.runService(reorderPresetsService,reorderPresetsServiceHandler);
        //Run preset service
        this.controller.runService(runPresetService,runPresetServiceHandler);
        //overwrite Bot LED Service
        this.controller.runService(overWriteBotLEDService,overWriteBotLEDServiceHandler);
        //clear bot's led overwrite service
        this.controller.runService(clearBotLEDOverwriteService,clearBotLEDOverwriteServiceHandler);
        //overwrite all bot's led service
        this.controller.runService(overWriteLEDService,overWriteLEDServiceHandler);
        //clear all bot's led overwrite service
        this.controller.runService(clearLEDOverwriteService,clearLEDOverwriteServiceHandler);
        
        //this.controller.runParingService();
        // this.controller.server.sub(serverMetaChannel,(data)=>{
        //     console.log(data);
            
        // })
    }

    public getController(){
        return this.controller;
    }
}
const server =new bridgeServer();
