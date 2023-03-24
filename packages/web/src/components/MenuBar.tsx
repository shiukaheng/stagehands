import { useContext } from 'react';
import Popup from 'reactjs-popup';
import { IServiceContext, ServiceContext, TopicContext } from '../contexts/ServerContext';
import { SettingsPanel } from './SettingsPanel';
import { IoSettingsSharp } from 'react-icons/io5';
import componentSelectContext from "../contexts/ComponentSwitchContext";
import { Preset } from 'schema';
import { MicPanelSelection, PresetPanelSelection, RunningPresetSelction, SidePanelSelection } from './SidePanel/PresetPanel/PresetPanelSelection';

function handelClickOrKeyDown({componentSelect, setComponentSelect, presets, serviceProvider} : 
    {componentSelect: SidePanelSelection, setComponentSelect: (componentSelect: SidePanelSelection) => void, presets: {id:string,value :Preset}[],
    serviceProvider: IServiceContext}) {

    let preset: { id: string, value: Preset } | undefined;
    let presetIndex: number;
    if (componentSelect.type === "running_preset") {

        presetIndex = componentSelect.presetIndex + 1;
    } else {
        presetIndex = 0;
    }
    preset = presets[presetIndex];
    if (preset === undefined) {
        setComponentSelect({ type: "preset_panel" } as PresetPanelSelection)
        alert("not preset left to run")
    } else {
        console.log(preset)
        serviceProvider?.runPreset.callback(preset.id);
        setComponentSelect({ type: "running_preset", presetIndex: presetIndex } as RunningPresetSelction);
    }
}
function MenuBar() {
    const serviceProvider = useContext(ServiceContext)!;
    const provider = useContext(TopicContext);
    const { componentSelect, setComponentSelect } = useContext(componentSelectContext);

    return (
        <div className="flex flex-row h-12 w-full overflow-auto items-center ui-highlight">
            <Popup trigger={<button className="px-4 py-2"><IoSettingsSharp /></button>} position="bottom left">
                <SettingsPanel />
            </Popup>
            <div className='flex-grow font-bold text-lg'>
                Stagehands Console
            </div>

            <button className="bg-red-600 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-600 transition-colors duration-500 text-white px-4 py-2 h-full"
                onKeyDown={(event)=>{
                    if(event.key === "ArrowRight"){
                        handelClickOrKeyDown({componentSelect, setComponentSelect, presets: provider?.stage?.presets!, serviceProvider});
                    }
                }}
                onClick={() => {
                    handelClickOrKeyDown({componentSelect, setComponentSelect, presets: provider?.stage?.presets!, serviceProvider});

                }
                }>run</button>

            <button onClick={() => {
                serviceProvider?.emergencyStop.callback();
                let resume = confirm("Resume?");
                if (resume) {
                    serviceProvider?.emergencyStopClear.callback();
                }
            }} className="bg-red-600 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-600 transition-colors duration-500 text-white px-4 py-2 h-full">Stop</button>
        </div>
    );
}

export default MenuBar;

