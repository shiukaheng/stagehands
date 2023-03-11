import { useContext, useState } from "react"
import componentSelectContext from "./ComponentSwitchContext";
import generateMicPanelButton from "./GenerateMicPanelButton"
import LiveModuleComponent from "./LiveModuleComponent";
import presetButtonsContext from "./PresetButtonsContext";
import { TopicContext } from "./ServerContext";
import PresetModuleComponent from "./PresetModuleComponent";


function MicPanel ({presetID} :{presetID : string | null}) {
    const provider = useContext(TopicContext);
    const presetIsNull = presetID === null
    const aasd  = presetID? provider?.stage?.presets[presetID] : null
    const moduleComponents = presetID? provider?.stage?.presets[presetID] : provider?.fleet && Object.entries(provider.fleet)


    return (
        <div className="h-full overflow-clip bg-white">
            <div id="MiddleSection" className=" border-solid w-72 h-4/5 snap-center overflow-y-auto overflow-x-hidden">
                { presetIsNull ? (
                    console.log("liveModuleComponent"),
                    provider?.fleet && Object.entries(provider.fleet).map(([key, value]) => (
                    <LiveModuleComponent module={value} key={key} />))
                    ): (
                        console.log("presetModuleComponent"),
                        provider?.stage?.presets[presetID] && Object.entries(provider.stage.presets[presetID].state).map(([key, value]) => (
                        <PresetModuleComponent module={value} key ={key} name={provider?.fleet?.[key]?.name}/>))

                    ) }
            </div>
            {/* The button that adds a new mic to the list */}
            <div id="BottomSection" className="flex flex-row bottom-0 ">
                <button
                    id="addButton"
                    className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-64 rounded m-2">
                +
                </button>
            </div>
        </div>
    )
}

export default MicPanel
