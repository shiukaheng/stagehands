import React from "react";
import { io } from "socket.io-client";
import { JSONValue, TopicClient } from "webtopics";
import { TopicChannel } from "webtopics/dist/utils/Channel";


export function useTopic<T extends JSONValue>(url: string | null = null, channel: TopicChannel<T> | null = null) {
  const [state, setState] = React.useState<T | null>(null);
  const clientRef = React.useRef<TopicClient>();
  const initial = React.useRef(false);
  // Callback for setting the state
  const runPreset = React.useCallback((presetID: T) => {
    // Do something
  }, []);
  React.useEffect(() => {
    console.log(url, channel, initial.current);
    if (url !== null && channel !== null && !initial.current) {
      initial.current = true;
      const socket = io(url);
      const client = new TopicClient(socket);
      clientRef.current = client;
      client.sub(channel, (value) => {
        setState(value);
      });
    }
  }, [url, channel]);
  return state;
}
