import { TopicContext } from "../../contexts/ServerContext"
import { useContext } from 'react';
import { FaArrowRight } from "react-icons/fa";
import componentSelectContext from "../../contexts/ComponentSwitchContext";

export function RunningpresetPanel({presetIndex} : {presetIndex: number}){
    const provider = useContext(TopicContext)
    const preset = provider?.stage?.presets[presetIndex]!
    const { setComponentSelect } = useContext(componentSelectContext);
    return(
        <div className="flex flex-col gap-5">
            <h1 className="p-5">Running preset : {preset.value.name}</h1>
            <h1>{"press"} </h1>
            <button className="rounded p-3 border-zinc-400 border ui-shadow ui-hover-highlight " onClick={() => {
            setComponentSelect({ type: "mic_panel", presetID: null })
          }
          }> <FaArrowRight size={10} /></button>
            <h1>{"arrow on your keyboard"}</h1>
            <h1> or the run button to run the next preset</h1>
            <br></br>
            <h1>{"press <- arrow on your keyboard to run"}</h1>
            <h1> the previous preset</h1>
        </div>

    )

}