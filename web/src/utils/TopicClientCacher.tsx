import { createContext } from "react";
import { TopicClient } from "webtopics";

export interface ITopicClientCache {
    [key: string]: TopicClient;
}

export const TopicClientCacheContext = createContext<ITopicClientCache | null>(null);

export function TopicClientCacher ({ children }: { children: React.ReactNode }) {
    const cache = {};
    return <TopicClientCacheContext.Provider value={cache}>
        {children}
    </TopicClientCacheContext.Provider>;
}