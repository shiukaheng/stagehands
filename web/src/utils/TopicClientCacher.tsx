import { createContext, useRef } from "react";
import { TopicClient } from "webtopics";

export interface ITopicClientCache {
    [key: string]: TopicClient;
}

export const TopicClientCacheContext = createContext<ITopicClientCache | null>(null);

export function TopicClientCacher ({ children }: { children: React.ReactNode }) {
    const cacheRef = useRef<ITopicClientCache>({});
    return <TopicClientCacheContext.Provider value={cacheRef.current}>
        {children}
    </TopicClientCacheContext.Provider>;
}