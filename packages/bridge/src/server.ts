import {
  createPresetService,
  deletePresetService,
  emergencyStopClearService,
  emergencyStopService,
  fleetTopic,
  recallFleetStateService,
  stageTopic,
  stopBotClearService,
  updatePresetService,
  stopBotService,
  reorderPresetsService,
  runPresetService,
  overWriteBotLEDService,
  botConnectionStatusTopic,
  connectBotService,
  disconnectBotService,
} from "schema";
import { serverMetaChannel } from "webtopics";
import { Controller } from "./controller/Controller";
import {
  connectBotServiceHandler,
  createPresetServiceHandler,
  deletePresetServiceHandler,
  disconnectBotServiceHandler,
  emergencyStopClearServiceHandler,
  emergencyStopServiceHandler,
  overWriteBotLEDServiceHandler,
  recallFleetStateServiceHandler,
  reorderPresetsServiceHandler,
  runPresetServiceHandler,
  stopBotClearServiceHandler,
  stopBotServiceHandler,
  updatePresetServiceHandler,
} from "./serviceHandlers";
import { fleetTopicHandler, serverMetaHandler } from "./topicHandler";

/**
 * The BridgeServer class is responsible for managing the connections between
 * different services and handlers.
 */
export class BridgeServer {
  private controller: Controller;

  constructor() {
    this.controller = new Controller();
    this.controller.serverPub(stageTopic);

    // setInterval(() => {
    //   this.controller.server.pub(botConnectionStatusTopic, this.controller.getContext().getBotConnectionState());
    // }, 500);

    this.controller.serverSub(fleetTopic, fleetTopicHandler);
    //this.controller.serverSub(serverMetaChannel,serverMetaHandler);

    this.controller.runService(createPresetService, createPresetServiceHandler);
    this.controller.runService(updatePresetService, updatePresetServiceHandler);
    this.controller.runService(deletePresetService, deletePresetServiceHandler);
    this.controller.runService(emergencyStopService, emergencyStopServiceHandler);
    this.controller.runService(emergencyStopClearService, emergencyStopClearServiceHandler);
    this.controller.runService(stopBotService, stopBotServiceHandler);
    this.controller.runService(stopBotClearService, stopBotClearServiceHandler);
    this.controller.runService(recallFleetStateService, recallFleetStateServiceHandler);
    this.controller.runService(reorderPresetsService, reorderPresetsServiceHandler);
    this.controller.runService(runPresetService, runPresetServiceHandler);
    this.controller.runService(overWriteBotLEDService, overWriteBotLEDServiceHandler);
    this.controller.runService(connectBotService, connectBotServiceHandler)
    this.controller.runService(disconnectBotService, disconnectBotServiceHandler)
    this.controller.runPairingService();
    this.controller.getContext().getServer().sub(serverMetaChannel,(serverMeta)=>{
      console.log(serverMeta);
      
    })
    
  }

  /**
   * Get the Controller instance.
   * @returns The Controller instance.
   */
  public getController(): Controller {
    return this.controller;
  }
}

const server = new BridgeServer();