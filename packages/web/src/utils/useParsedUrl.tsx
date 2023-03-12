import { useMemo } from 'react';

export function useParsedUrl(serverUrl: string | null) {
    return useMemo(() => {
        if (serverUrl) {
            const urlObj = new URL(serverUrl);
            return {
                hostname: urlObj.hostname,
                port: urlObj.port
            };
        }
        return undefined;
    }, [serverUrl]);
}
