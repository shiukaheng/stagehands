import React from "react";
import { stageTopic, fleetTopic, createPresetService, updatePresetService, deletePresetService, runPresetService, emergencyStopService, emergencyStopClearService, stopBotService, stopBotClearService } from "schema";
import { TopicHookExtractor, useThrottledTopic, useTopic } from "./utils/useTopic";
import { ServiceHookExtractor, useService } from "./utils/useService";
import { ServiceChannel } from "webtopics";


/**
 * IServiceContext is an interface that holds the structure of the services
 * 
 * @param createPreset - createPresetService
 * @param updatePreset - updatePresetService
 * @param deletePreset - deletePresetService
 * @param emergencyStop - emergencyStopService
 * @param emergencyStopClear - emergencyStopClearService * @param stopBot - stopBotService * @param stopBotClear - stopBotClearService
 * 
 * @returns IServiceContext
 */
export interface IServiceContext {
  createPreset:       ServiceHookExtractor<typeof createPresetService>;
  updatePreset:       ServiceHookExtractor<typeof updatePresetService>;
  deletePreset:       ServiceHookExtractor<typeof deletePresetService>;
  runPreset:          ServiceHookExtractor<typeof runPresetService>;
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

export function ServiceProvider({url, children}: {url: string | null, children: React.ReactNode | null}) {
  const createPreset =        useService(url, createPresetService);
  const updatePreset =        useService(url, updatePresetService);
  const deletePreset =        useService(url, deletePresetService);
  const runPreset =           useService(url, runPresetService);
  const emergencyStop =       useService(url, emergencyStopService);
  const emergencyStopClear =  useService(url, emergencyStopClearService);
  const stopBot =             useService(url, stopBotService);
  const stopBotClear =        useService(url, stopBotClearService);

  const serviceProvider: IServiceContext = {
    createPreset,
    updatePreset,
    deletePreset,
    runPreset,
    emergencyStop,
    emergencyStopClear,
    stopBot,
    stopBotClear,
  };

  return <ServiceContext.Provider value={serviceProvider}>{children}</ServiceContext.Provider>;
}

export function TopicProvider({url, children}: {url: string | null, children: React.ReactNode | null}) {
  const stage = useThrottledTopic(url, stageTopic, 30);
  const fleet = useThrottledTopic(url, fleetTopic, 30);

  const topicProvider: ITopicContext = {
    stage,
    fleet,
  };

  return <TopicContext.Provider value={topicProvider}>{children}</TopicContext.Provider>;
}
