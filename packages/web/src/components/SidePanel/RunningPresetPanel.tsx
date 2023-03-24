import { TopicContext } from "../../contexts/ServerContext"
import { useContext } from 'react';

export function RunningpresetPanel({presetIndex} : {presetIndex: number}){
    const provider = useContext(TopicContext)
    const preset = provider?.stage?.presets[presetIndex]!


    return(
        <div className="flex flex-col gap-5">
            <h1 className="p-5">Running preset : {preset.value.name}</h1>
            <h1>{"click -> arrow on your keyboard"} </h1>
            <h1> or the run button to run the next preset</h1>
        </div>

    )

}