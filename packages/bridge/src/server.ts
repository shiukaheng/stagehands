import { serverMetaChannel } from "webtopics"
import { createPresetService, deletePresetService, emergencyStopClearService, emergencyStopService, fleetTopic, recallFleetStateService, stageTopic, stopBotClearService, updatePresetService, stopBotService, reorderPresetsService, runPresetService, overWriteBotLEDService, botConnectionStatusTopic } from "schema"
import { Controller } from "./controller/Controller"
import { CreatePresetServiceHandler, DeletePresetServiceHandler, EmergencyStopClearServiceHandler, EmergencyStopServiceHandler, overWriteBotLEDServiceHandler, RecallFleetStateServiceHandler, reorderPresetsServiceHandler, runPresetServiceHandler, StopBotClearServiceHandler, StopBotServiceHandler, UpdatePresetServiceHandler } from "./serviceHandlers"
import { fleetTopicHandler } from "./topicHandler"


export class bridgeServer {
    private controller: Controller;
    constructor() {
        this.controller = new Controller(3001);
        //publish fleet topic
        this.controller.serverPub(stageTopic);
        //register new botClient with its botID
        //controller.serverSub(serverMetaChannel,newBotClientRegistrationHandler);
        this.controller.server.pub(stageTopic, this.controller.getContext().getStageState())

        setInterval(() => {
            this.controller.server.pub(botConnectionStatusTopic, this.controller.getContext().getBotConnectionState())
        }, 500)
        this.controller.serverSub(fleetTopic, fleetTopicHandler);
        //register bot client ID
        //this.controller.runService(registerBotClientIDService,registerBotClientIDServiceHandler);
        //create preset service
        this.controller.runService(createPresetService, CreatePresetServiceHandler);
        //update preset service
        this.controller.runService(updatePresetService, UpdatePresetServiceHandler);
        //delete preset service
        this.controller.runService(deletePresetService, DeletePresetServiceHandler);
        //emergency stop service
        this.controller.runService(emergencyStopService, EmergencyStopServiceHandler);
        //emergency stop clear service
        this.controller.runService(emergencyStopClearService, EmergencyStopClearServiceHandler);
        //stop particular bot service
        this.controller.runService(stopBotService, StopBotServiceHandler);
        //clear particular bot stop service
        this.controller.runService(stopBotClearService, StopBotClearServiceHandler);
        //recall fleet state service
        this.controller.runService(recallFleetStateService, RecallFleetStateServiceHandler);
        //Reorder presets service
        this.controller.runService(reorderPresetsService, reorderPresetsServiceHandler);
        //Run preset service
        this.controller.runService(runPresetService, runPresetServiceHandler);
        //overwrite Bot LED Service
        this.controller.runService(overWriteBotLEDService, overWriteBotLEDServiceHandler);
        //clear bot's led overwrite servicethis.controller.server.pub(botConnectionStatusTopic,this.controller.getContext().getBotConnectionState())ndler);
        this.controller.server.sub(serverMetaChannel, (data) => {
            console.log(data);

        })
        this.controller.runParingService();
        // this.controller.server.sub(serverMetaChannel,(data)=>{
        //     console.log(data);

        // })
    }

    public getController() {
        return this.controller;
    }
}
const server = new bridgeServer();
