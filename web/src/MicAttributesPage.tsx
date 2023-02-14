import { useRef, useState } from "react"

export default function MicAttributesPage() {
  const xValInputElemRef = useRef<HTMLInputElement>(null)
  const xValRangeElemRef = useRef<HTMLInputElement>(null)
  const yValInputElemRef = useRef<HTMLInputElement>(null)
  const yValRangeElemRef = useRef<HTMLInputElement>(null)
  return (
    <div className="absolute inset-y-10 left-10 w-70 h-auto border-red-200 border-2 rounded-md p-5 bg-red-300">
      <table 
        id="attributes"
        className="bg-gray-300 font-bold h-96 w-64 rounded p-2 ">
        
        <tr>
          <th>Name :</th>
          <td>
            <input
              type="text"
              id="micName"
              className="text-center mb-2 h-6 w-32"
              defaultValue={"Mic 1"}
              size={11}></input>
          </td>
        </tr>

        <tr>
          <th>Status :</th>
          <td>
            <select
              id="micStatus"
              className="rounded-none text-center mb-2 h-6 w-32">
              <option value="active"> active </option>
              <option value="out of power">out of power</option>
            </select>
          </td>
        </tr>

        <tr>
          <th>Module :</th>
          <td>
            <select
              id="micModule"
              className="mb-2 text-center h-6 w-32">
              <option value="1">Module 1</option>
              <option value="2">Module 2</option>
              <option value="3">Module 3</option>
            </select>
          </td>
        </tr>

        <tr>
          <th>X :</th>
          <td>
            <input 
              ref={xValInputElemRef}
              type={"number"}
              id={"micX"}
              className={"text-center mb-2 h-6 w-32"}
              min={0}
              max={100}
              
              defaultValue={0}
              onChange = {() => {
                xValRangeElemRef.current!.value = xValInputElemRef.current!.value
              }}
              
              ></input>
          </td>
        </tr>

        <tr>
          <th>x bar :</th>
          <td>
            <input 
              ref = {xValRangeElemRef}
              type = {"range"}
              id = {"micXRange"}
              className = {"mb-2 h-6 w-32"}
              min = {0}
              max = {100}
              defaultValue = {0}
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
              className={"text-center mb-2 h-6 w-32"}
              min={0}
              max={100}
              defaultValue={0}
              onChange = {() => {
                yValRangeElemRef.current!.value = yValInputElemRef.current!.value
              }}
              
              
              ></input>
          </td>
        </tr>

        <tr>
          <th>y bar :</th>
          <td>
            <input 
              ref = {yValRangeElemRef}
              type = {"range"}
              id = {"micXRange"}
              className = {"mb-2 h-6 w-32"}
              min = {0}
              max = {100}
              defaultValue = {0}
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
            <button className="mb-2 h-6 w-32 bg-slate-50 text-center">
                30
            </button>
          </td>
        </tr>

        <tr>
          <th>Battery :</th>
          <td>
            <button className="mb-2 h-6 w-32 bg-slate-50 text-center">
                30
            </button>
          </td>
        </tr>

      </table>
    </div> 
    
  )
}