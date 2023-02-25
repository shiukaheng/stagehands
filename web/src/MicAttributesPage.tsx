import { useRef, useState } from "react"
import MicStand from "./MicStand"

export default function MicAttributesPage(micstand :MicStand) {
  const xValInputElemRef = useRef<HTMLInputElement>(null)
  const xValRangeElemRef = useRef<HTMLInputElement>(null)
  const yValInputElemRef = useRef<HTMLInputElement>(null)
  const yValRangeElemRef = useRef<HTMLInputElement>(null)
  const angleinputElemRef = useRef<HTMLInputElement>(null)
  const angleRangeElemRef = useRef<HTMLInputElement>(null)
  return (
    // <div className=" left-10 w-80 h-full border-gray-200 border-2 rounded-md p-5 bg-white overflow-auto">
    //   <div className="flex flex-row">

    //     <button className="left-0 top-0 m-1 rounded-md bg-gray-100 p-1 hover:bg-slate-400 active:bg-slate-500 font-bold">
    //       Back
    //     </button>
    //   </div>
      
    <div className="h-5/6 overflow-clip pt-5">
      <div className="h-full w-full p-2 bg-gray-100 rounded-md">

      <table 
        id="attributes"
        className=" font-bold h-full w-full rounded p-5 bottom-0 overflow-y-auto overflow-x-hidden">
        
        <tr>
          <th>Name :</th>
          <td>
            <input
              type="text"
              id="micName"
              className="text-center mb-2 h-6 w-32 rounded-md"
              defaultValue={micstand.id}
              size={11}></input>
          </td>
        </tr>

        <tr>
          <th>Status :</th>
          <td>
            <button
              id="micStatus"
              className="text-center mb-2 h-6 w-32 bg-white rounded-md">
                active 
            </button>
          </td>
        </tr>

        <tr>
          <th>Module :</th>
          <td>
            <button
              id="micModule"
              className="mb-2 text-center h-6 w-32 bg-white rounded-md">
                Microphone
            </button>
          </td>
        </tr>

        <tr>
          <th>X :</th>
          <td>
            <input 
              ref={xValInputElemRef}
              type={"number"}
              id={"micX"}
              className={"text-center mb-2 h-6 w-32 rounded-md"}
              min={0}
              max={100}
              
              defaultValue={micstand.x}
              onChange = {() => {
                xValRangeElemRef.current!.value = xValInputElemRef.current!.value
              }}
              
              ></input>
          </td>
        </tr>

        <tr>
          <th> </th>
          <td>
            <input 
              ref = {xValRangeElemRef}
              type = {"range"}
              id = {"micXRange"}
              className = {"mb-2 h-6 w-32"}
              min = {0}
              max = {100}
              defaultValue = {micstand.x}
              step = {1}
              onChange = {() => {
                // When the range input is changed, useRef to get the input element
                // and set the value of the input element to the value of the range input
                xValInputElemRef.current!.value = xValRangeElemRef.current!.value
              }}
            ></input>
          </td>
        </tr>

        <tr>

          <th>Y :</th>
          <td>
            <input
              ref = {yValInputElemRef}
              type={"number"}
              id={"micY"}
              className={"text-center mb-2 h-6 w-32 rounded-md"}
              min={0}
              max={100}
              defaultValue={micstand.y}
              onChange = {() => {
                yValRangeElemRef.current!.value = yValInputElemRef.current!.value
              }}
              
              
              ></input>
          </td>
        </tr>

        <tr>
          <th> </th>
          <td>
            <input 
              ref = {yValRangeElemRef}
              type = {"range"}
              id = {"micXRange"}
              className = {"mb-2 h-6 w-32"}
              min = {0}
              max = {100}
              defaultValue = {micstand.y}
              step = {1}

              onChange = {() => {
                yValInputElemRef.current!.value = yValRangeElemRef.current!.value
              }}
              // onChange = {() => {
              //   document.getElementById("micX").innerText = document.getElementById("micXRange")
              // }}
            ></input>
          </td>
        </tr>

        <tr>
          <th>Angle :</th>
          <td>
          <input 
              ref = {angleinputElemRef}
              type = {"number"}
              id = {"AngleInput"}
              className = {"mb-2 h-6 w-32 text-center rounded-md"}
              min = {0}
              max = {180}
              defaultValue = {0}
              step = {1}
              onChange = {() => {
                // When the range input is changed, useRef to get the input element
                // and set the value of the input element to the value of the range input
                angleRangeElemRef.current!.value = angleinputElemRef.current!.value
              }}
            ></input>
          </td>
        </tr>

        <tr>
          <th> </th>
          <td>
            <input 
              ref = {angleRangeElemRef}
              type = {"range"}
              id = {"AngleRange"}
              className = {"mb-2 h-6 w-32 "}
              min = {0}
              max = {180}
              defaultValue = {0}
              step = {1}

              onChange = {() => {
                angleinputElemRef.current!.value = angleRangeElemRef.current!.value
              }}
            ></input>
          </td>
        </tr>

        <tr>
          <th>Battery :</th>
          <td>
            <button className="mb-2 h-6 w-32 bg-slate-50 text-center rounded-md">
                30
            </button>
          </td>
        </tr>

      </table>
      </div>
    </div> 
    
  )
}