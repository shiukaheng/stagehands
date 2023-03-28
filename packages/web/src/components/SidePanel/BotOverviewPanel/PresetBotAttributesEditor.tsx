import { useRef, useState, useContext, useMemo, useCallback } from "react"
import { BotState, FleetState, getRecallFleetState, Preset, RecallBotState } from 'schema';
import _ from "lodash";
import { TopicContext, ServiceContext } from "../../../contexts/ServerContext";
import { rgbToHex } from "../../../utils/rgbToHex";
import { hexTorgb } from "../../../utils/hexTorgb";
import NumberAndBarInput from "../../../utils/NumberAndBarInput"
import ReadOnlyAttribute from "../../../utils/ReadOnlyAttributes";
import componentSelectContext from "../../../contexts/ComponentSwitchContext";
import PresetModuleComponents from "./PresetModuleComponents";
import { FaArrowLeft } from "react-icons/fa";

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
            }}> <FaArrowLeft size={25} /> </button>

            <table
              id="attributes"
              className=" font-bold h-full w-full rounded p-5 bottom-0 overflow-y-auto overflow-x-hidden">

              <tbody>

                <ReadOnlyAttribute title="Name" value={bot.name} />

                <ReadOnlyAttribute title="Module" value={bot.module.type} />

                <NumberAndBarInput
                  title="X"
                  value={bot?.targetPose.position[0]}
                  setValue={(value: number) => {
                    preset.state[botID].targetPose.position[0] = value
                    presetUpdate(presetID, preset)
                  }}
                  boundary={{ min: 0, max: 100 }} />

                <NumberAndBarInput
                  title="Y"
                  value={bot.targetPose.position.at(2)!}
                  setValue={(value: number) => {
                    preset.state[botID].targetPose.position[2] = value
                    presetUpdate(presetID, preset)
                  }}
                  boundary={{ min: 0, max: 100 }} />

                <PresetModuleComponents bot={bot} presetID={presetID} preset={preset} presetUpdate={presetUpdate} />

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
