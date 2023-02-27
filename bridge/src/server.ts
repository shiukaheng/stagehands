import { TopicServer } from "webtopics"
import { Server } from "socket.io"
import { FleetState, PresetSet, StageState, createPresetService, deletePresetService, emergencyStopClearService, emergencyStopService, fleetTopic, recallBotStateService, recallFleetStateService, stageTopic, stopBotClearService, updatePresetService } from "@schema/dist"
import { z } from "zod"
import { ServiceChannel } from "webtopics/dist/utils/Channel"
import { v4 } from "uuid"

