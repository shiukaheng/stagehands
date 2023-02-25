import React from "react";
import { io } from "socket.io-client";
import { Channel, JSONValue, TopicClient } from "webtopics";
import { TopicChannel } from "webtopics/dist/utils/Channel";
import { presetsChannel, Presets } from "fake-stagehands-backend";

export const ServerContext = React.createContext<Presets | null>(null);

export function useTopic<T extends JSONValue>(url: string | null = null, channel: TopicChannel<T> | null = null) {
  const [state, setState] = React.useState<T | null>(null);
  const clientRef = React.useRef<TopicClient>();
  const initial = React.useRef(false);
  React.useEffect(() => {
    if (url !== null && channel !== null && !initial.current) {
      initial.current = true;
      const socket = io(url);
      console.log("socket", socket);
      const client = new TopicClient(socket);
      clientRef.current = client;
      client.sub(channel, setState);
    }
  }, [url, channel]);
  return state;
}

export function ServerProvider({ url, children }: { url: string | null; children: React.ReactNode }) {
  const presets = useTopic(url, presetsChannel);
  return <ServerContext.Provider value={presets}>{children}</ServerContext.Provider>;
}