import { serverMetaChannel, TopicServer } from "webtopics"
import { Server } from "socket.io"
import { FleetState, PresetSet, StageState, createPresetService, deletePresetService, emergencyStopClearService, emergencyStopService, fleetTopic, recallBotStateService, recallFleetStateService, stageTopic, stopBotClearService, updatePresetService, stopBotService, reorderPresetsService, runPresetService } from "schema"
import { z } from "zod"
import { ServiceChannel } from "webtopics/dist/utils/Channel"
import { v4 } from "uuid"
import { Controller } from "./controller/Controller"
import { CreatePresetServiceHandler, DeletePresetServiceHandler, EmergencyStopClearServiceHandler, EmergencyStopServiceHandler, RecallFleetStateServiceHandler, reorderPresetsServiceHandler, runPresetServiceHandler, StopBotClearServiceHandler, StopBotServiceHandler, UpdatePresetServiceHandler } from "./serviceHandlers"
import { fleetTopicHandler, newBotClientRegistrationHandler } from "./topicHandler"


export class bridgeServer{
    constructor(){
        const controller:Controller=Controller.getInstance();
        //publish fleet topic
        //controller.serverPub(fleetTopic);
        //register new botClient with its botID
        controller.serverSub(serverMetaChannel,newBotClientRegistrationHandler);
        controller.serverSub(fleetTopic,fleetTopicHandler);


        //create preset service
        controller.runService(createPresetService,CreatePresetServiceHandler);
        //update preset service
        controller.runService(updatePresetService,UpdatePresetServiceHandler);
        //delete preset service
        controller.runService(deletePresetService,DeletePresetServiceHandler);
        //emergency stop service
        controller.runService(emergencyStopService,EmergencyStopServiceHandler);
        //emergency stop clear service
        controller.runService(emergencyStopClearService,EmergencyStopClearServiceHandler);
        //stop particular bot service
        controller.runService(stopBotService,StopBotServiceHandler);
        //clear particular bot stop service
        controller.runService(stopBotClearService,StopBotClearServiceHandler);
        //recall fleet state service
        controller.runService(recallFleetStateService,RecallFleetStateServiceHandler);
        //Reorder presets service
        controller.runService(reorderPresetsService,reorderPresetsServiceHandler);
        //Run preset service
        controller.runService(runPresetService,runPresetServiceHandler);
    }

    public getController(){
        return Controller.getInstance();
    }
}

