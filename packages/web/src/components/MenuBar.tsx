import { useContext } from 'react';
import Popup from 'reactjs-popup';
import { IServiceContext, ServiceContext, TopicContext } from '../contexts/ServerContext';
import { SettingsPanel } from './SettingsPanel';
import { IoSettingsSharp } from 'react-icons/io5';
import componentSelectContext from "../contexts/ComponentSwitchContext";
import { Preset } from 'schema';
import { MicPanelSelection, PresetPanelSelection, RunningPresetSelction, SidePanelSelection } from './SidePanel/PresetPanel/PresetPanelSelection';
import { handelClickOrKeyDown } from '../utils/handelKeyDown';
import { Tooltip } from "react-tooltip"
import { AiFillPlayCircle } from 'react-icons/ai';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';


function MenuBar() {
    const serviceProvider = useContext(ServiceContext)!;
    const provider = useContext(TopicContext);
    const { componentSelect, setComponentSelect } = useContext(componentSelectContext);
    const navigate = useNavigate();

    return (
        <div className="flex flex-row h-12 w-full overflow-auto items-center ui-highlight">
            <Popup trigger={<button className="px-4 py-2"><IoSettingsSharp /></button>} position="bottom left">
                <SettingsPanel />
            </Popup>
            <button className="px-4 py-2"
                onClick={() => {
                    navigate("/tutorials");
                }}>
                    Tutorials
            </button>
            <div className='flex-grow font-bold text-lg'>
                Stagehands Console
            </div>

            <button className="px-4 py-2 h-full rounded ui-hover-highlight"
                onKeyDown={(event) => {
                    if (event.key === "ArrowRight") {
                        handelClickOrKeyDown({ componentSelect, setComponentSelect, presets: provider?.stage?.presets!, serviceProvider, isRight: 1 });
                    }
                    if (event.key === "ArrowLeft") {
                        handelClickOrKeyDown({ componentSelect, setComponentSelect, presets: provider?.stage?.presets!, serviceProvider, isRight: -1 });
                    }
                    if (event.key === "Escape") {
                        setComponentSelect({ type: "mic_panel", presetID: null })
                    }
                }}
                onClick={() => {
                    handelClickOrKeyDown({ componentSelect, setComponentSelect, presets: provider?.stage?.presets!, serviceProvider, isRight: 1 });
                }
                }
                data-tooltip-id={"run-from-the-start-button"}
                data-tooltip-content="execute presets from the start"
                data-tooltip-place='left'>
                <AiFillPlayCircle size={20} />
                <Tooltip id={"run-from-the-start-button"} />
            </button>

            <button
                className="bg-red-600 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-600 transition-colors duration-500 text-white px-4 py-2 h-full"
                onClick={() => {
                    serviceProvider?.emergencyStop.callback();
                    let resume = confirm("Resume?");
                    if (resume) {
                        serviceProvider?.emergencyStopClear.callback();
                    }
                }}
                data-tooltip-id={"Emergency Stop Button!!"}
                data-tooltip-content="Emergency Stop Button!!"
                data-tooltip-place='left'>
                <BsFillExclamationTriangleFill size={20} />
                <Tooltip id={"Emergency Stop Button!!"} />
            </button>
        </div>
    );
}

export default MenuBar;

