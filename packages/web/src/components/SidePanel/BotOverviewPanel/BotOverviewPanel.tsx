import { useContext, useMemo } from "react"
import LiveBotWidget from "./LiveBotWidget";
import { TopicContext } from "../../../contexts/ServerContext";
import PresetBotWidget from "./PresetBotWidget";

/**
 * Provides a list of all the bots in the current preset, or live bots, depending on the presetID
 */
function BotOverviewPanel({ presetID }: { presetID: string | null }) {
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
                        <LiveBotWidget botState={value} key={key} />))
                ) : (
                    // Otherwise, we are displaying a preset's bots
                    // provider?.stage?.presets[presetID] && Object.entries(provider.stage.presets[presetID].state).map(([key, value]) => (
                    //     <PresetModuleComponent recallBot={value} key={key} name={provider?.fleet?.[key]?.name} presetID={presetID} botID={key} />))
                    currentPreset && Object.entries(currentPreset.state).map(([key, value]) => (
                        <PresetBotWidget recallBot={value} key={key} name={provider?.fleet?.[key]?.name} presetID={presetID} botID={key} />))
                )
            }
        </div>
    )
}

export default BotOverviewPanel
