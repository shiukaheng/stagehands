import { ReactNode, createContext } from "react";
import useStickyState from "../utils/useStickyState";

export const settingsContext = createContext({
    serverUrl: null as string | null,
    setServerUrl: (url: string | null) => { },
})

/**
 * SettingsProvider is a context provider that holds client side settings such as the server url
 */
export function SettingsProvider({ children }: { children: ReactNode }) {
    const [serverUrl, setServerUrl] = useStickyState<string | null>(null, "url");
    return (
        <settingsContext.Provider value={{ serverUrl, setServerUrl }}>
            {children}
        </settingsContext.Provider>
    )
}