import React, { useContext, useRef } from 'react';
import { Preset as PresetT, BotState } from 'schema';
// import saveIcon from '../../../assets/save-icon.svg'
// import editIcon from '../../../assets/edit-icon.svg'
// import delIcon from '../../../assets/delete-icon.svg'
import { AiFillSave, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Tooltip } from "react-tooltip"
import 'react-tooltip/dist/react-tooltip.css';
import { ServiceContext, TopicContext } from '../../../contexts/ServerContext';
import componentSelectContext from "../../../contexts/ComponentSwitchContext";

function savePreset(preset: PresetT) {
    // serialise to JSON and save to file
    const json = JSON.stringify(preset);

    // create file
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = preset.name + ".json";
    link.href = url;
    link.click();
}

/**
 * Widget representing a preset
 */
function PresetWidget({ preset, id }: { preset: PresetT, id: string }) {
    const services = useContext(ServiceContext);
    const { componentSelect, setComponentSelect } = useContext(componentSelectContext);
    return (
        <div
            id={preset.name}
            className="font-bold box-border ui-shadow ui-highlight ui-div ui-hover-highlight-solid cursor-grab py-4">
            <div>
                {(preset.name)}
                <br></br>
                <PresetOptionMenu preset={preset} id={id} services={services} setComponentSelect={setComponentSelect}/>
            </div>
        </div>
    );
}

function PresetOptionMenu({ preset, id, services, setComponentSelect }: { preset: PresetT, id: string, services: any, setComponentSelect: any }) {
    return (<div className='flex flex-row px-4'>
        {/* <button id="RunButton" className="rounded-full flex-grow" onClick={() => services?.runPreset.callback(id)} data-tooltip-id="run-tooltip" data-tooltip-content="run">
            Run
            <Tooltip id="run-tooltip" />
        </button> */}
        {/* <button id="SaveButton" className="rounded-full p-1" onClick={() => savePreset(preset)} data-tooltip-id="save-tooltip" data-tooltip-content="save">
            // <img src={saveIcon} style={{
            //     height: 25,
            //     width: 25
            // }}alt="save" />
            <AiFillSave />
            <Tooltip id="save-tooltip" />
        </button> */}
        <button id="EditButton" className="rounded-full p-1" onClick={() => setComponentSelect({
            type: "mic_panel",
            presetID: id
        })} data-tooltip-id="edit-tooltip" data-tooltip-content="View & edit preset">
            {/* <img src={editIcon} style={{
                height: 25,
                width: 25
            }}  alt="save" /> */}
            <AiFillEdit />
            <Tooltip id="edit-tooltip" />
        </button>
        <button id="DeleteButton" className="rounded-full p-1" onClick={() => services?.deletePreset.callback(id)} data-tooltip-id="delete-tooltip" data-tooltip-content="Delete preset">
            {/* <img src={delIcon} style={{
                height: 25,
                width: 25
            }} alt="save" /> */}
            <AiFillDelete />
            <Tooltip id="delete-tooltip" />
        </button>
    </div>);
}


export default PresetWidget;
