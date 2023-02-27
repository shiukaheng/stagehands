import React from "react";
import { presetsChannel, liveFleetChannel } from "@schema/channels";
import { Presets, FleetState, BotState } from "@schema/schemas";
import { useTopic } from "./useTopic";

/**
 * Interface that holds a preset and a fleet property
 * 
 */
export interface IServerContext {
	presets: Presets | null;
	fleet: FleetState | null;
}

export const ServerContext = React.createContext<IServerContext | null>(null);

interface IServerProviderArgs {
	url: string | null;
	defaultCtx?: IServerContext;
	overrideCtx?: IServerContext;
	children: React.ReactNode;
}

export function ServerProvider ({ url, defaultCtx, overrideCtx, children }: IServerProviderArgs) {

	const realPresets = useTopic(url, 
	const realFleet = useTopic(url, liveFleetChannel);

	const provider: IServerContext = {
		presets,
		fleet,
	};

	return <ServerContext.Provider value={provider}>{children}</ServerContext.Provider>;
}