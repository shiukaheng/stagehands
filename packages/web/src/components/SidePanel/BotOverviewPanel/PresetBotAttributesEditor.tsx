import { useRef, useState, useContext, useMemo, useCallback } from "react"
import { BotState, FleetState, getRecallFleetState, Preset, RecallBotState } from 'schema';
import _ from "lodash";
import { TopicContext, ServiceContext } from "../../../contexts/ServerContext";
import { rgbToHex } from "../../../utils/rgbToHex";
import { hexTorgb } from "../../../utils/hexTorgb";
import componentSelectContext from "../../../contexts/ComponentSwitchContext";

/**
 * Component for displaying and editing the attributes of a bot in a preset
 */
export default function PresetBotAttributesEditor({ presetID, botID }: { presetID: string, botID: string }) {
  const provider = useContext(TopicContext);
  const services = useContext(ServiceContext);
  const preset = provider?.stage?.presets.find((preset) => preset.id === presetID)?.value
  const bot = provider?.stage?.presets.find((preset) => preset.id === presetID)?.value.state[botID]
  const { setComponentSelect } = useContext(componentSelectContext);

  const presetUpdate = useCallback(
    _.debounce((id: string, newPreset: Preset) => {
      services?.updatePreset.callback({ presetId: id, preset: newPreset })
    }, 100, { "leading": false, "trailing": true, 'maxWait': 100 })
    , [services?.updatePreset])

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
  const [ledAnimationInput, setLedAnimationInput] = useState(bot?.baseLEDState.ledAnimation.animationMode)

  return (
    preset !== null && bot != null ?
      (
        <div className="h-5/6 overflow-clip pt-1">
          <div className="h-full w-full p-2 overflow-y-auto flex flex-col">
            <button className=" w-16 rounded cursor-pointer p-3 ui-shadow ui-hover-highlight " onClick={() => {
              setComponentSelect({ type: "mic_panel", presetID: presetID })
            }}> Back </button>

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
                      defaultValue={bot.name}
                      readOnly={true}
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

                      defaultValue={bot?.targetPose.position[0]}
                      onChange={() => {
                        const xVal = parseInt(xValInputElemRef.current!.value)
                        if (xVal <= 100 && xVal >= 0) {
                          xValRangeElemRef.current!.value = xValInputElemRef.current!.value
                          preset.state[botID].targetPose.position[0] = parseInt(xValInputElemRef.current!.value)
                          // if(provider !== null && provider.fleet !== undefined){
                          //   provider.fleet[botID].targetPose.position[0] +=1
                          //   console.log("???")
                          // }
                          presetUpdate(presetID, preset)
                        } else {
                          alert("X value must be between 0 and 100")
                          xValInputElemRef.current!.value = xValRangeElemRef.current!.value
                        }

                        // console.log(preset.state[botID])
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
                      defaultValue={bot?.targetPose.position[0]}
                      step={1}
                      onChange={() => {
                        // When the range input is changed, useRef to get the input element
                        // and set the value of the input element to the value of the range input
                        xValInputElemRef.current!.value = xValRangeElemRef.current!.value
                        preset.state[botID].targetPose.position[0] = parseInt(xValRangeElemRef.current!.value)
                        presetUpdate(presetID, preset)

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
                      defaultValue={bot?.targetPose.position[2]}
                      onChange={() => {
                        const yVal = parseInt(yValInputElemRef.current!.value)
                        if (yVal <= 100 && yVal >= 0) {
                          yValRangeElemRef.current!.value = yValInputElemRef.current!.value
                          preset.state[botID].targetPose.position[2] = parseInt(yValInputElemRef.current!.value)
                          presetUpdate(presetID, preset)

                        } else {
                          alert("Y value must be between 0 and 100")
                          yValInputElemRef.current!.value = yValRangeElemRef.current!.value
                        }
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
                      defaultValue={bot?.targetPose.position[2]}
                      step={1}

                      onChange={() => {
                        yValInputElemRef.current!.value = yValRangeElemRef.current!.value
                        preset.state[botID].targetPose.position[2] = parseInt(yValInputElemRef.current!.value)
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
                      type="color"
                      defaultValue={rgbToHex(bot.baseLEDState.rgbValue.map((x) => x * 255))}
                      id="ledColor"
                      ref={ledColorElemRef}
                      size={15}

                      onChange={() => {
                        const hex = ledColorElemRef.current!.value
                        preset.state[botID].baseLEDState.rgbValue = hexTorgb(hex)
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
                      value={ledAnimationInput}
                      ref={ledAnimationElemRef}
                      onChange={() => {
                        if (ledAnimationElemRef.current!.value === "constant") {
                          preset.state[botID].baseLEDState.ledAnimation = { flashingFrequency: 0, animationMode: "constant" }
                          setLedAnimationInput("constant")
                        } else {
                          preset.state[botID].baseLEDState.ledAnimation = { flashingFrequency: 5, animationMode: "flashing" }
                          setLedAnimationInput("flashing")
                        }
                        presetUpdate(presetID, preset)

                        console.log(ledAnimationInput)
                      }}>
                      <option value="constant" className="bg-zinc-700">Constant</option>
                      <option value="flashing" className="bg-zinc-700" >Flashing</option>

                    </select>
                  </td>
                </tr>

                {ledAnimationInput === "flashing" ? (
                  <tr>
                    <th> Frequency</th>
                    <td>
                      <input
                        ref={flashingFrequencyElemRef}
                        type={"number"}
                        id={"flashingFrequency"}
                        min={1}
                        max={10}
                        defaultValue={bot.baseLEDState.ledAnimation.flashingFrequency}
                        onChange={() => {
                          if (parseInt(flashingFrequencyElemRef.current!.value) > 10 || parseInt(flashingFrequencyElemRef.current!.value) < 1) {
                            alert("Flashing frequency must be between 1 and 10")
                            flashingFrequencyElemRef.current!.value = preset.state[botID].baseLEDState.ledAnimation.flashingFrequency?.toString()!
                          } else {
                            preset.state[botID].baseLEDState.ledAnimation.flashingFrequency = parseInt(flashingFrequencyElemRef.current!.value)
                            presetUpdate(presetID, preset)
                          }
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
