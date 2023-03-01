import React from "react";
import { stageTopic, fleetTopic, createPresetService, updatePresetService, deletePresetService, emergencyStopService, emergencyStopClearService, stopBotService, stopBotClearService } from "@schema/index";
import { TopicHookExtractor, useTopic } from "./utils/useTopic";
import { ServiceHookExtractor, useService } from "./utils/useService";
import { ServiceChannel } from "webtopics/dist/utils/Channel";

// /**
//  * Interface that holds a preset and a fleet property
//  * 
//  */
// export interface IServerContext {
// 	presets: Presets | null;
// 	fleet: FleetState | null;
// }

// type wrapper for ready and ServiceChannelCallback


/**
 * IServiceContext is an interface that holds the structure of the services
 * 
 * @param createPreset - createPresetService
 * @param updatePreset - updatePresetService
 * @param deletePreset - deletePresetService
 * @param emergencyStop - emergencyStopService
 * @param emergencyStopClear - emergencyStopClearService
 * @param stopBot - stopBotService
 * @param stopBotClear - stopBotClearService
 * 
 * @returns IServiceContext
 */
export interface IServiceContext {
  createPreset:       ServiceHookExtractor<typeof createPresetService>;
  updatePreset:       ServiceHookExtractor<typeof updatePresetService>;
  deletePreset:       ServiceHookExtractor<typeof deletePresetService>;
  emergencyStop:      ServiceHookExtractor<typeof emergencyStopService>;
  emergencyStopClear: ServiceHookExtractor<typeof emergencyStopClearService>;
  stopBot:            ServiceHookExtractor<typeof stopBotService>; 
  stopBotClear:       ServiceHookExtractor<typeof stopBotClearService>;
}

/**
 * ITopicContext is an interface that holds the structure of the topics
 * 
 * @param stage - stageTopic
 * @param fleet - fleetTopic
 * 
 * @returns ITopicContext
 */
export interface ITopicContext {
  stage: TopicHookExtractor<typeof stageTopic>;
  fleet: TopicHookExtractor<typeof fleetTopic>;
}

/* Services */
export const ServiceContext = React.createContext<IServiceContext | null>(null);

/* Topics */
export const TopicContext = React.createContext<ITopicContext | null>(null);

export function ServiceProvider(url: string | null, children: React.ReactNode | null) {
  const createPreset = useService(url, createPresetService);
  const updatePreset = useService(url, updatePresetService);
  const deletePreset = useService(url, deletePresetService);
  const emergencyStop = useService(url, emergencyStopService);
  const emergencyStopClear = useService(url, emergencyStopClearService);
  const stopBot = useService(url, stopBotService);
  const stopBotClear = useService(url, stopBotClearService);

  const serviceProvider: IServiceContext = {
    createPreset,
    updatePreset,
    deletePreset,
    emergencyStop,
    emergencyStopClear,
    stopBot,
    stopBotClear,
  };

  return <ServiceContext.Provider value={serviceProvider}>{children}</ServiceContext.Provider>;
}

// export const ServerContext = React.createContext<IServerContext | null>(null);

// interface IServerProviderArgs {
// 	url: string | null;
// 	defaultCtx?: IServerContext;
// 	overrideCtx?: IServerContext;
// 	children: React.ReactNode;
// }

// export function ServerProvider ({ url, defaultCtx, overrideCtx, children }: IServerProviderArgs) {

// 	const realPresets = useTopic(url, 
// 	const realFleet = useTopic(url, liveFleetChannel);

// 	const provider: IServerContext = {
// 		presets,
// 		fleet,
// 	};


// 	return <ServerContext.Provider value={provider}>{children}</ServerContext.Provider>;
// }