import { TopicServer } from "webtopics"
import { Server } from "socket.io"
import { FleetState, PresetSet, StageState, createPresetService, deletePresetService, emergencyStopClearService, emergencyStopService, fleetTopic, recallBotStateService, recallFleetStateService, stageTopic, stopBotClearService, updatePresetService } from "@schema/dist"
import { z } from "zod"
import { ServiceChannel } from "webtopics/dist/utils/Channel"
import { v4 } from "uuid"
import { Controller } from "./controller/Controller"
import { CreatePresetServiceHandler, DeletePresetServiceHandler, EmergencyStopClearServiceHandler, EmergencyStopServiceHandler, RecallFleetStateServiceHandler, StopBotClearServiceHandler, UpdatePresetServiceHandler } from "./serviceHandlers"

const controller:Controller=Controller.getInstance();

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
//stop bot clear service
controller.runService(stopBotClearService,StopBotClearServiceHandler);
//recall fleet state service
controller.runService(recallFleetStateService,RecallFleetStateServiceHandler);

