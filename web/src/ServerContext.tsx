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
export interface IServerProvider {
  presets: Presets | null;
  fleet: FleetState | null;
}

export const ServerContext = React.createContext<IServerProvider | null>(null);

export function useTopic<T extends JSONValue>(url: string | null = null, channel: TopicChannel<T> | null = null) {
  const [state, setState] = React.useState<T | null>(null);
  const clientRef = React.useRef<TopicClient>();
  const initial = React.useRef(false);
  // Callback for setting the state
  const runPreset = React.useCallback((presetID: T) => {
    // Do something
  }, []);
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

export function ServerProvider({ url, realServer, children }: { url: string | null; realServer: boolean, children: React.ReactNode }) {
  const fleet: FleetState = {
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
    }
  const  presets: Presets = {
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

  // if we are using a real server, then we need to subscribe to the topics
  if (realServer) {
    const presets = useTopic(url, presetsChannel);
    const fleet = useTopic(url, liveFleetChannel);
  }

  const provider: IServerProvider = {
    presets,
    fleet,
  };
  
  return <ServerContext.Provider value={provider}>{children}</ServerContext.Provider>;
}