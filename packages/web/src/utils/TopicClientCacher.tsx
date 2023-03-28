import { createContext, useRef } from "react";
import { TopicClient } from "webtopics";

export interface ITopicClientCache {
    [key: string]: TopicClient;
}

export const TopicClientCacheContext = createContext<ITopicClientCache | null>(null);

/**
 * TopicClientCacher helps useTopic and useService reuse the same TopicClients if connecting to the same server
 */
export function TopicClientCacher ({ children }: { children: React.ReactNode }) {
    const cacheRef = useRef<ITopicClientCache>({});
    // (window as any).topicClientCache = cacheRef.current;
    return <TopicClientCacheContext.Provider value={cacheRef.current}>
        {children}
    </TopicClientCacheContext.Provider>;
}