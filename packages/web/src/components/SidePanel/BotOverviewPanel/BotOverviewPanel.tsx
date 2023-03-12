import { useContext } from "react"
import LiveBotWidget from "./LiveBotWidget";
import { TopicContext } from "../../../contexts/ServerContext";
import PresetModuleComponent from "./PresetBotWidget";

/**
 * Provides a list of all the bots in the current preset, or live bots, depending on the presetID
 */
function BotOverviewPanel({ presetID }: { presetID: string | null }) {
    const provider = useContext(TopicContext);
    const presetIsNull = presetID === null
    return (
        <div id="MiddleSection" className=" border-solid snap-center overflow-y-auto overflow-x-hidden">
            {presetIsNull ?
                (
                    <div>
                        🎬 Live display
                    </div>
                ) : (
                    <div>
                        📁 Preset: {presetID}
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
                    provider?.stage?.presets[presetID] && Object.entries(provider.stage.presets[presetID].state).map(([key, value]) => (
                        <PresetModuleComponent recallBot={value} key={key} name={provider?.fleet?.[key]?.name} presetID={presetID} botID={key} />))
                )
            }
        </div>
    )
}

export default BotOverviewPanel
