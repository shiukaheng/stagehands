import { useContext } from "react";
import componentSelectContext from "./ComponentSwitchContext";

function generateMicPanelButton(buttons: any[]) {
  //const {componentSelect, setComponentSelect} = useContext(componentSelectContext);
  //return buttons.concat(
  //  <button
  //    id={("MicButton" + buttons.length.toString())}
  //    className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-32 w-64 rounded m-2"
  //    onClick={() => setComponentSelect("preeset-panel")}>
  //      <div className="text-left indent-[10.5%]">
  //    Name: {("\xa0 Mic " + buttons.length.toString())}
  //    </div>
  //    <div className="text-left indent-5">
  //    Status: <button id="micStatus" className="bg-green-500 text-green-500 font-bold rounded-none border-none h-6 w-32 m-2">.</button>
  //    </div>
  //    <div className="text-left indent-[5%]">
  //    {'Module: \xa0 Microphone'}
  //    </div>
  //  </button>)
  }

  export default generateMicPanelButton
