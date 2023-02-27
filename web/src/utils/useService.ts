import React, { useCallback } from "react";
import { io } from "socket.io-client";
import { RequestType, ServiceChannel, ServiceResponseType, TopicClient } from "webtopics";

export type ServiceHook<T extends RequestType, U extends ServiceResponseType> = {
    ready: boolean;
    callback: (data: T, dest?: string) => Promise<U>;
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
    React.useEffect(() => {
        console.log(url, channel, initial.current);
        if (url !== null && channel !== null && !initial.current) {
            console.log('initializing');
            initial.current = true;
            const socket = io(url);
            console.log("socket", socket);
            const client = new TopicClient(socket);
            clientRef.current = client;
            client.getServerID().then((id) => {
                serverIDRef.current = id;
                readyRef.current = true;
                setReady(true);
            });
        }
    }, [url, channel]);
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