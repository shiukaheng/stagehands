import React, { useContext, useEffect } from "react";
import { stageTopic, fleetTopic, createPresetService, updatePresetService, deletePresetService, runPresetService, emergencyStopService, emergencyStopClearService, stopBotService, stopBotClearService, reorderPresetsService, recallFleetStateService } from "schema";
import { TopicHookExtractor, useThrottledTopic, useTopic } from "../utils/useTopic";
import { ServiceHookExtractor, useService } from "../utils/useService";
import { ServiceChannel } from "webtopics";
import { settingsContext } from "./SettingsContext";


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
	createPreset: ServiceHookExtractor<typeof createPresetService>;
	updatePreset: ServiceHookExtractor<typeof updatePresetService>;
	deletePreset: ServiceHookExtractor<typeof deletePresetService>;
	runPreset: ServiceHookExtractor<typeof runPresetService>;
	reorderPreset: ServiceHookExtractor<typeof reorderPresetsService>;
	emergencyStop: ServiceHookExtractor<typeof emergencyStopService>;
	emergencyStopClear: ServiceHookExtractor<typeof emergencyStopClearService>;
	stopBot: ServiceHookExtractor<typeof stopBotService>;
	stopBotClear: ServiceHookExtractor<typeof stopBotClearService>;
	recallFleetState : ServiceHookExtractor<typeof recallFleetStateService>;
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

export function ServiceProvider({ children }: { children: React.ReactNode | null }) {
	const {serverUrl} = useContext(settingsContext)
	const createPreset = useService(serverUrl, createPresetService);
	const updatePreset = useService(serverUrl, updatePresetService);
	const deletePreset = useService(serverUrl, deletePresetService);
	const reorderPreset = useService(serverUrl, reorderPresetsService);
	const runPreset = useService(serverUrl, runPresetService);
	const emergencyStop = useService(serverUrl, emergencyStopService);
	const emergencyStopClear = useService(serverUrl, emergencyStopClearService);
	const stopBot = useService(serverUrl, stopBotService);
	const stopBotClear = useService(serverUrl, stopBotClearService);
	const recallFleetState = useService(serverUrl, recallFleetStateService);

	const serviceProvider: IServiceContext = {
		createPreset,
		updatePreset,
		deletePreset,
		reorderPreset,
		runPreset,
		emergencyStop,
		emergencyStopClear,
		stopBot,
		stopBotClear,
		recallFleetState,
	};

	return <ServiceContext.Provider value={serviceProvider}>{children}</ServiceContext.Provider>;
}

export function TopicProvider({ children }: { children: React.ReactNode | null }) {
	const {serverUrl} = useContext(settingsContext)
	const stage = useThrottledTopic(serverUrl, stageTopic, 30);
	const fleet = useThrottledTopic(serverUrl, fleetTopic, 30);

	const topicProvider: ITopicContext = {
		stage,
		fleet,
	};

	return <TopicContext.Provider value={topicProvider}>{children}</TopicContext.Provider>;
}
