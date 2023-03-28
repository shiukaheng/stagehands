import React, { useCallback, useContext } from "react";
import { io } from "socket.io-client";
import { RequestType, ServiceChannel, ServiceChannelCallback, ServiceResponseType, TopicClient } from "webtopics";
import { TopicClientCacheContext } from "./TopicClientCacher";

export type ServiceHook<T extends RequestType, U extends ServiceResponseType> = {
    ready: boolean;
    callback: (data: T, dest?: string) => Promise<U>;
}

// Extractor function, given a service channel, return a ServiceHook
export type ServiceHookExtractor<T extends ServiceChannel<any, any>> = {
    ready: boolean;
    callback: ServiceChannelCallback<T>;
}

/**
 * A hook that can be used to connect to a server and send requests to it
 * @param url The URL of the server to connect to
 * @param channel The channel to use
 * @returns A ready flag and a callback function that can be used to send requests
 */
export function useService<T extends RequestType, U extends ServiceResponseType>(url: string | null = null, channel: ServiceChannel<T, U>): ServiceHook<T, U> {
    const clientRef = React.useRef<TopicClient | null>(null);
    const initial = React.useRef(false);
    const serverIDRef= React.useRef<string | null>(null);
    const readyRef = React.useRef(false);
    const [ready, setReady] = React.useState(false);
    const clientCache = useContext(TopicClientCacheContext)
    React.useEffect(() => {
        console.log(url, channel, initial.current);
        if (url !== null && channel !== null && clientCache !== null && !initial.current) {
            console.log('initializing');
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
            client.getServerID().then((id) => {
                console.log("Ready",readyRef.current)
                serverIDRef.current = id;
                readyRef.current = true;
                setReady(true);
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [url, channel, clientCache]);
    const callback = useCallback((data: T, dest?: string) => {
        if (clientRef.current === null) {
            throw new Error("Client not initialized");
        }
        if (!readyRef.current === true) {
            throw new Error("Client not ready");
        }
        return clientRef.current.req(channel, dest ?? serverIDRef.current as string, data);
    }, []);
    return { ready, callback };
}