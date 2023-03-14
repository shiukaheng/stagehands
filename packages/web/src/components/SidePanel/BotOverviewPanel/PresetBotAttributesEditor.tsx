import { useRef, useState, useContext, useMemo, useCallback } from "react"
import { BotState, Preset, RecallBotState } from 'schema';
import _ from "lodash";
import { TopicContext, ServiceContext } from "../../../contexts/ServerContext";

/**
 * Component for displaying and editing the attributes of a bot in a preset
 */
export default function PresetBotAttributesEditor({ bot, name, presetID, botID }: { bot: RecallBotState, name: string | undefined, presetID: string, botID: string }) {
  const provider = useContext(TopicContext);
  const services = useContext(ServiceContext);

  const presetUpdate =  useCallback(
    _.debounce((id : string ,newPreset: Preset)=> {
      console.log("Updating preset")
      
      // console.log(newPreset)
      services?.updatePreset.callback({ presetId: id, preset: newPreset })
    },100,{"leading" : false, "trailing" : true, 'maxWait' : 100}) 
  , [services?.updatePreset])

  const preset = useMemo(() => {
    if (provider === null) {
        console.log("Provider not found")
        return null;
    } else {
        console.log("Finding preset")
        return provider?.stage?.presets.find((preset) => preset.id === presetID)?.value || null;
    }
}, [presetID, provider?.stage?.presets.find((preset) => preset.id === presetID)?.value.state[botID]])
  if (preset === undefined) {
    throw new Error("Preset not found")
  }

  const xValInputElemRef = useRef<HTMLInputElement>(null)
  const xValRangeElemRef = useRef<HTMLInputElement>(null)
  const yValInputElemRef = useRef<HTMLInputElement>(null)
  const yValRangeElemRef = useRef<HTMLInputElement>(null)
  const angleinputElemRef = useRef<HTMLInputElement>(null)
  const angleRangeElemRef = useRef<HTMLInputElement>(null)
  const ledColorElemRef = useRef<HTMLInputElement>(null)
  const ledAnimationElemRef = useRef<HTMLSelectElement>(null)
  const flashingFrequencyElemRef = useRef<HTMLInputElement>(null)
  const [xValInput , setXValInput] = useState(preset?.state[botID].targetPose.position[0])



  return (
    preset !== null ?
    (<div className="h-5/6 overflow-clip pt-5">
      <div className="h-full w-full p-2 overflow-y-auto">

        <table
          id="attributes"
          className=" font-bold h-full w-full rounded p-5 bottom-0 overflow-y-auto overflow-x-hidden">

          <tbody>
            <tr>
              <th>Name</th>
              <td>
                <input
                  type="text"
                  id="micName"
                  defaultValue={name}
                  readOnly = {true}
                  size={11}>
                  </input>
              </td>
            </tr>
         
            <tr>
              <th>Module</th>
              <td>
                <button
                  id="micModule"
                  className="text-center h-6 w-32">
                  {bot.module.type}
                </button>
              </td>
            </tr>
          
            <tr>
              <th>X</th>
              <td>
                <input
                  ref={xValInputElemRef}
                  type={"number"}
                  id={"micX"}
                  min={0}
                  max={100}

                  value={xValInput}
                  onChange={() => {
                    xValRangeElemRef.current!.value = xValInputElemRef.current!.value
                    preset.state[botID].targetPose.position[0] = parseInt(xValInputElemRef.current!.value)

                    presetUpdate(presetID, preset)
                    setXValInput(preset.state[botID].targetPose.position[0])
                    console.log(preset.state[botID])
                    // Undercore_.debounce(update({ presetID: presetID, newPreset: preset }), 1000)
                    // Undercore_

                  }}

                ></input>
              </td>
            </tr>
         
            <tr>
              <th> </th>
              <td>
                <input
                  ref={xValRangeElemRef}
                  type={"range"}
                  id={"micXRange"}
                  min={0}
                  max={100}
                  value={xValInput}
                  step={1}
                  onChange={() => {
                    // When the range input is changed, useRef to get the input element
                    // and set the value of the input element to the value of the range input
                    xValInputElemRef.current!.value = xValRangeElemRef.current!.value
                    preset.state[botID].targetPose.position[0] = parseInt(xValRangeElemRef.current!.value)
                    presetUpdate(presetID, preset)
                    setXValInput(preset.state[botID].targetPose.position[0])

                  }}
                ></input>
              </td>
            </tr>
        
            <tr>

              <th>Y</th>
              <td>
                <input
                  ref={yValInputElemRef}
                  type={"number"}
                  id={"micY"}
                  min={0}
                  max={100}
                  defaultValue={bot.targetPose.position.at(1)}
                  onChange={() => {
                    yValRangeElemRef.current!.value = yValInputElemRef.current!.value
                    preset.state[botID].targetPose.position[1] = parseInt(yValInputElemRef.current!.value)
                    presetUpdate(presetID, preset)
                  }}
                ></input>
              </td>
            </tr>
        
            <tr>
              <th> </th>
              <td>
                <input
                  ref={yValRangeElemRef}
                  type={"range"}
                  id={"micXRange"}
                  min={0}
                  max={100}
                  defaultValue={bot.targetPose.position.at(1)}
                  step={1}

                  onChange={() => {
                    yValInputElemRef.current!.value = yValRangeElemRef.current!.value
                    preset.state[botID].targetPose.position[1] = parseInt(yValInputElemRef.current!.value)
                    presetUpdate(presetID, preset)
                  }}
                // onChange = {() => {
                //   document.getElementById("micX").innerText = document.getElementById("micXRange")
                // }}
                ></input>
              </td>
            </tr>
         
            <tr>
              <th>Angle</th>
              <td>
                <input
                  ref={angleinputElemRef}
                  type={"number"}
                  id={"AngleInput"}
                  min={0}
                  max={180}
                  defaultValue={0} //TODO get angle from bot
                  step={1}
                  onChange={() => {
                    // When the range input is changed, useRef to get the input element
                    // and set the value of the input element to the value of the range input
                    angleRangeElemRef.current!.value = angleinputElemRef.current!.value
                    presetUpdate(presetID, preset)
                  }}
                ></input>
              </td>
            </tr>
        
            <tr>
              <th> </th>
              <td>
                <input
                  ref={angleRangeElemRef}
                  type={"range"}
                  id={"AngleRange"}
                  min={0}
                  max={180}
                  defaultValue={0}
                  step={1}

                  onChange={() => {
                    angleinputElemRef.current!.value = angleRangeElemRef.current!.value
                    presetUpdate(presetID, preset)
                  }}
                ></input>
              </td>
            </tr>

            <tr>
              <th>LED </th>
              <td>
                <input 
                  type = "color"
                  defaultValue={rgbToHex(bot.baseLEDState.rgbValue)}
                  id = "ledColor"
                  ref = {ledColorElemRef}
                  size = {15}
           
                  onChange={()=>{
                    const hex = ledColorElemRef.current!.value
                    const r = parseInt(hex.slice(1, 3), 16)
                    const g = parseInt(hex.slice(3, 5), 16)
                    const b = parseInt(hex.slice(5, 7), 16)
                    preset.state[botID].baseLEDState.rgbValue = [r, g, b]
                    presetUpdate(presetID, preset)
                  }}>
                </input>
              </td>
            </tr>

            <tr>
              <th> Led Animation</th>
              <td>
                <select 
                  className=" ui-shadow ui-highlight ui-div h-6 w-32 text-center" 
                  defaultValue={bot.baseLEDState.ledAnimation.animationMode}
                  ref = {ledAnimationElemRef}
                  onChange={()=>{
                    if(ledAnimationElemRef.current!.value === "constant"){
                      preset.state[botID].baseLEDState.ledAnimation = {flashingFrequency : 0, animationMode : "constant" }
                    }else {
                      preset.state[botID].baseLEDState.ledAnimation = {flashingFrequency : 5, animationMode : "flashing" }
                    }
                    presetUpdate(presetID, preset)
                  }}> 
                  <option value = "constant" className="bg-zinc-700">Constant</option>
                  <option value = "falshing" className="bg-zinc-700" >Flashing</option>
                  
                </select>
              </td>
            </tr>

            {bot.baseLEDState.ledAnimation.animationMode  === "flashing" ? (
            <tr>
              <th> Flashing Frequency</th>
              <td>
                <input
                  ref={flashingFrequencyElemRef}
                  type={"number"}
                  id={"flashingFrequency"}
                  min={0} 
                  max={10}
                  defaultValue={bot.baseLEDState.ledAnimation.flashingFrequency}
                  onChange={() => {
                    preset.state[botID].baseLEDState.ledAnimation.flashingFrequency = parseInt(flashingFrequencyElemRef.current!.value)
                    presetUpdate(presetID, preset)
                  }}
                ></input>
              </td>
            </tr>
            ) : null}

          </tbody>
        </table>
      </div>
    </div>) : null
  )
}

// pass a list of number as parameter
function rgbToHex([r, g, b]: number[]) {
  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;}
  return ("#" + componentToHex(r) + componentToHex(g) + componentToHex(b));
}
