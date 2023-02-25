import saveIcon from './assets/save-icon.svg'
import editIcon from './assets/edit-icon.svg'
import delIcon from './assets/delete-icon.svg'
import { Tooltip } from "react-tooltip"
import 'react-tooltip/dist/react-tooltip.css';

function doNothing() {
    return
  }

function generatePresetPanelButton(buttons: any[]) {
    return buttons.concat(
        <button
            id={("PresetButton" + buttons.length.toString())}
            className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-32 w-64 rounded m-2">
            <div>
                {("Preset " + buttons.length.toString() + "\xa0\xa0\xa0\xa0")}
                <button
                id="RunButton"
                className="rounded-full border-solid border-green-600 border-2 m-2 p-1"
                onClick={() => doNothing()}>
                {'\xa0\xa0\xa0 Run \xa0\xa0\xa0'} 
            </button>
            <br></br>
            <div>
            <button
                id="SaveButton"
                className="rounded-full border-solid border-slate-500 border-2 m-2 p-1"
                onClick={() => doNothing()} data-tooltip-id="save-tooltip" data-tooltip-content="save">
                <img src={saveIcon} style={{ height: 25, width: 25 }} className="fill-black" alt="save" />
                <Tooltip id="save-tooltip" />
            </button>
            <button
                id="EditButton"
                className="rounded-full border-solid border-slate-500 border-2 m-2 p-1"
                onClick={() => doNothing()} data-tooltip-id="edit-tooltip" data-tooltip-content="view & edit">
                <img src={editIcon} style={{ height: 25, width: 25 }} className="fill-black" alt="save" />
                <Tooltip id="edit-tooltip" />
            </button>
            <button
                id="DeleteButton"
                className="rounded-full border-solid border-red-500 border-2 m-2 p-1"
                onClick={() => doNothing()} data-tooltip-id="delete-tooltip" data-tooltip-content="delete">
                <img src={delIcon} style={{ height: 25, width: 25 }} className="fill-black" alt="save" />
                <Tooltip id="delete-tooltip" />
            </button>
            </div>
            </div>
        </button>)
    }
  
    export default generatePresetPanelButton