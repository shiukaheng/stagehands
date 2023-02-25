import { createTopic } from "webtopics";
import { fleetStateSchema, presetsSchema } from "./schemas";

export const liveFleetChannel = createTopic("liveFleet", fleetStateSchema);

export const presetsChannel = createTopic("presets", presetsSchema);