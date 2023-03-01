import React from "react";
import { stageTopic, fleetTopic, createPresetService, updatePresetService, deletePresetService, emergencyStopService, emergencyStopClearService, stopBotService, stopBotClearService } from "@schema/index";
import { TopicType, useTopic } from "./utils/useTopic";
import { CallbackOf, useService } from "./utils/useService";
import { ServiceChannel } from "webtopics/dist/utils/Channel";

// /**
//  * Interface that holds a preset and a fleet property
//  * 
//  */
// export interface IServerContext {
// 	presets: Presets | null;
// 	fleet: FleetState | null;
// }

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
  createPreset:       CallbackOf<typeof createPresetService>;
  updatePreset:       CallbackOf<typeof updatePresetService>;
  deletePreset:       CallbackOf<typeof deletePresetService>;
  emergencyStop:      CallbackOf<typeof emergencyStopService>;
  emergencyStopClear: CallbackOf<typeof emergencyStopClearService>;
  stopBot:            CallbackOf<typeof stopBotService>; 
  stopBotClear:       CallbackOf<typeof stopBotClearService>;
}

export interface ITopicContext {
  stage: TopicType<typeof stageTopic>;
  fleet: TopicType<typeof fleetTopic>;
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