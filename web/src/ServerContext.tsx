import React from "react";
import { io } from "socket.io-client";
import { Channel, JSONValue, TopicClient } from "webtopics";
import { TopicChannel } from "webtopics/dist/utils/Channel";
import { presetsChannel, liveFleetChannel } from "@schema/channels";
import { Presets, FleetState, BotState } from "@schema/schemas";

/**
 * Interface that holds a preset and a fleet property
 * 
 */
export interface IServerContext {
	presets: Presets | null;
	fleet: FleetState | null;
}

export const ServerContext = React.createContext<IServerContext | null>(null);

export function useTopic<T extends JSONValue>(url: string | null = null, channel: TopicChannel<T> | null = null) {
	const [state, setState] = React.useState<T | null>(null);
	const clientRef = React.useRef<TopicClient>();
	const initial = React.useRef(false);
	React.useEffect(() => {
		console.log(url, channel, initial.current)
		if (url !== null && channel !== null && !initial.current) {
			console.log('initializing')
			initial.current = true;
			const socket = io(url);
			console.log("socket", socket);
			const client = new TopicClient(socket);
			clientRef.current = client;
			client.sub(channel, (value) => {
				console.log("value", value);
				setState(value);
			});
			console.log("client", client);
			console.log("stateValue", state);
		}
	}, [url, channel]);
	return state;
}

interface IServerProviderArgs {
	/**
	 * URL of the server to connect to
	 * If null, then we will use default data
	 */
	url: string | null;
	/**
	 * Default data to use if the server is not yet connected
	 */
	defaultContext?: IServerContext;
	/**
	 * Data to override the context (which ignores the server or default data if provided)
	 */
	dummyContext?: Partial<IServerContext>;
	children: React.ReactNode;
}

export const defaultContext: IServerContext = {
	presets: null,
	fleet: null,
}

export const dummyContext: IServerContext = {
	fleet: {
		"bot1": {
			name: "bot1",
			position: [0, 0, 0],
			rotation: [0, 0, 0, 1]
		},
		"bot2": {
			name: "bot2",
			position: [5, 0, 0],
			rotation: [0, 0, 0, 1]
		}
	},
	presets: {
		"preset1": {
			name: "preset1",
			bots: {
				"bot1": {
					name: "bot1",
					position: [-2, -2, 0],
					rotation: [0, 0, 0, 1]
				},
				"bot2": {
					name: "bot2",
					position: [2, 2, 0],
					rotation: [0, 0, 0, 1]
				}
			}
		}
	}
}

export function ServerProvider({ url, defaultContext, dummyContext, children }: IServerProviderArgs) {

	// if we are using a real server, then we need to subscribe to the topics
	const realPresets = useTopic(url, presetsChannel);
	const realFleet = useTopic(url, liveFleetChannel);

	if (defaultContext === undefined) {
		defaultContext = defaultContext;
	}

	const provider: IServerContext = {
		presets: dummyContext?.presets ?? realPresets ?? defaultContext?.presets ?? null,
		fleet: dummyContext?.fleet ?? realFleet ?? defaultContext?.fleet ?? null,
	};

	return <ServerContext.Provider value={provider}>{children}</ServerContext.Provider>;
}