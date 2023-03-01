import React, { useContext } from "react";
import { io } from "socket.io-client";
import { JSONValue, TopicClient } from "webtopics";
import { TopicChannel } from "webtopics/dist/utils/Channel";
import { TopicClientCacheContext } from "./TopicClientCacher";


export function useTopic<T extends JSONValue>(url: string | null = null, channel: TopicChannel<T> | null = null) {
  const [state, setState] = React.useState<T | undefined>(undefined);
  const clientRef = React.useRef<TopicClient>();
  const initial = React.useRef(false);
  const clientCache = useContext(TopicClientCacheContext)
  React.useEffect(() => {
    console.log(url, channel, initial.current);
    if (url !== null && channel !== null && clientCache !== null && !initial.current) {
      initial.current = true;
      // Check if we already have a client for this URL
      let client = clientCache[url];
      if (client === undefined) {
          // Create a new client
          const socket = io(url);
          client = new TopicClient(socket);
          clientCache[url] = client;
          console.log(`Created new client for ${url}`);
      } else {
          console.log(`Using cached client for ${url}`);
      }
      clientRef.current = client;
      client.sub(channel, (value) => {
        setState(value);
      });
    }
  }, [url, channel, clientCache]);
  return state;
}