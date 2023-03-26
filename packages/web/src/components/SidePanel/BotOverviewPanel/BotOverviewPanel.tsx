import { useContext, useMemo } from "react"
import LiveBotWidget from "./LiveBotWidget";
import { TopicContext } from "../../../contexts/ServerContext";
import PresetBotWidget from "./PresetBotWidget";
import screenSelectionContext, { ScreenSelection } from "web/src/contexts/WhichScreenContext";

/**
 * Provides a list of all the bots in the current preset, or live bots, depending on the presetID
 */
function BotOverviewPanel({ presetID }: { presetID: string | null }) {
    const { screenSelection, setScreenSelection } = useContext(screenSelectionContext);
    const provider = useContext(TopicContext);
    const presetIsNull = presetID === null
    const currentPreset = useMemo(() => {
        if (presetIsNull) {
            return null;
        } else {
            return provider?.stage?.presets.find((preset) => preset.id === presetID)?.value || null;
        }
    }, [presetID, provider?.stage?.presets])
    return (
        <div>
        <div id="MiddleSection" className=" border-solid h-full snap-center overflow-y-auto overflow-x-hidden">
            {presetIsNull ?
                (
                    <div className="text-lg font-bold mb-4 ui-div ui-shadow ui-highlight-extra mx-6 p-2">
                        🎬 Live display
                    </div>
                ) : (
                    <div className="text-lg font-bold mb-4 ui-div ui-shadow ui-highlight-extra mx-6 p-2">
                        📁 Preset: {currentPreset?.name}
                    </div>
                )
            }
            {presetIsNull ?
                (
                    // If presetID is null, then we are displaying live bots
                    provider?.fleet && Object.entries(provider.fleet).map(([key, value]) => (
                        <LiveBotWidget botState={value} key={key} botID ={key} />))
                ) : (
                    // Otherwise, we are displaying a preset's bots
                    // provider?.stage?.presets[presetID] && Object.entries(provider.stage.presets[presetID].state).map(([key, value]) => (
                    //     <PresetModuleComponent recallBot={value} key={key} name={provider?.fleet?.[key]?.name} presetID={presetID} botID={key} />))
                    currentPreset && Object.entries(currentPreset.state).map(([key, value]) => (
                        <PresetBotWidget recallBot={value} key={key} name={provider?.fleet?.[key]?.name} presetID={presetID} botID={key} />))
                )
            }
        </div>
        <div className="flex flex-row gap-2 w-full">
            <button
            className="font-bold box-border flex-shrink ui-div ui-highlight-solid ui-shadow m-6 p-4 w-full"
            onClick={() => { setScreenSelection(("connection_screen" as ScreenSelection))
            console.log("goto connection screen button clicked") }}>
                Connect Bots +
            </button>
        </div>
        </div>
    )
}

export default BotOverviewPanel
