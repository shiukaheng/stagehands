import React from "react";
import { io } from "socket.io-client";
import { Channel, JSONValue, TopicClient } from "webtopics";
import { TopicChannel } from "webtopics/dist/utils/Channel";
import { presetsChannel, liveFleetChannel } from "./channels";
import { Presets, FleetState, BotState } from "./schemas"

/**
 * Interface that holds a preset and a fleet property
 * 
 */
export interface IServerProvider {
  presets: Presets | null;
  fleet: FleetState | null;
}

export const ServerContext = React.createContext<IServerProvider | null>(null);

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

export function ServerProvider({ url, children }: { url: string | null; children: React.ReactNode }) {
  const presets = useTopic(url, presetsChannel);
  const fleet = useTopic(url, liveFleetChannel);

  const provider: IServerProvider = {
    presets,
    fleet,
  };
  
  return <ServerContext.Provider value={provider}>{children}</ServerContext.Provider>;
}