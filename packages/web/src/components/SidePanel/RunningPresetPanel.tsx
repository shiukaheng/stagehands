import { ServiceContext, TopicContext } from "../../contexts/ServerContext"
import { useContext } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import componentSelectContext from "../../contexts/ComponentSwitchContext";
import { handelClickOrKeyDown } from "../../utils/handelKeyDown";

export function RunningpresetPanel({ presetIndex }: { presetIndex: number }) {
    const provider = useContext(TopicContext)
    const preset = provider?.stage?.presets[presetIndex]!
    const {componentSelect, setComponentSelect } = useContext(componentSelectContext);
    const serviceProvider = useContext(ServiceContext)!;
    return (
        <div className="flex flex-col gap-5">
            <h1 className="p-5">Running preset : {preset.value.name}</h1>

            <div className="flex flex-row gap-2 items-center justify-center ">
                <h1>{"press"} </h1>
                <button className="rounded p-3 border-zinc-400 border ui-shadow ui-hover-highlight " onClick={() => {
                    handelClickOrKeyDown({componentSelect, setComponentSelect, presets: provider?.stage?.presets!, serviceProvider,isRight : 1});
                }
                }> <FaArrowRight size={10} /></button>
                <h1>{" on your keyboard"}</h1>
            </div>
            <h1> or the run button to run the next preset</h1>

            <br></br>

            <div className="flex flex-row gap-2 items-center justify-center ">
            <h1>{"press"} </h1>
                <button className="rounded p-3 border-zinc-400 border ui-shadow ui-hover-highlight " onClick={() => {
                    handelClickOrKeyDown({componentSelect, setComponentSelect, presets: provider?.stage?.presets!, serviceProvider,isRight : -1});
                }
                }> <FaArrowLeft size={10} /></button>
                <h1>{" on your keyboard"}</h1>
            </div>
            <h1>to run the last preset</h1>

            <br></br>

            <div className="flex flex-row gap-2 items-center justify-center ">
            <h1>{"press"} </h1>
                <button className="rounded p-3 border-zinc-400 border ui-shadow ui-hover-highlight " onClick={() => {
                    setComponentSelect({type : "mic_panel",presetID : null})
                }
                }> Esc</button>
                <h1>{" to quit running"}</h1>
            </div>

        </div>

    )

}