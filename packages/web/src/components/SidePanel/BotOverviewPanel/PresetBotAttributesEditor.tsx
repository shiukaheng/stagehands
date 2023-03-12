import { useRef, useState, useContext } from "react"
import { BotState, Preset, RecallBotState } from 'schema';
import _ from "lodash";
import { TopicContext, ServiceContext } from "../../../contexts/ServerContext";

/**
 * Component for displaying and editing the attributes of a bot in a preset
 */
export default function PresetBotAttributesEditor({ bot, name, presetID, botID }: { bot: RecallBotState, name: string | undefined, presetID: string, botID: string }) {
  const provider = useContext(TopicContext);
  const preset = provider?.stage?.presets[presetID]
  const services = useContext(ServiceContext);
  if (preset === undefined) {
    throw new Error("Preset not found")
  }
  const xValInputElemRef = useRef<HTMLInputElement>(null)
  const xValRangeElemRef = useRef<HTMLInputElement>(null)
  const yValInputElemRef = useRef<HTMLInputElement>(null)
  const yValRangeElemRef = useRef<HTMLInputElement>(null)
  const angleinputElemRef = useRef<HTMLInputElement>(null)
  const angleRangeElemRef = useRef<HTMLInputElement>(null)


  return (
    <div className="h-5/6 overflow-clip pt-5">
      <div className="h-full w-full p-2 bg-zinc-100 rounded-md">

        <table
          id="attributes"
          className=" font-bold h-full w-full rounded p-5 bottom-0 overflow-y-auto overflow-x-hidden">

          <tbody>
            <tr>
              <th>Name :</th>
              <td>
                <input
                  type="text"
                  id="micName"
                  className="text-center mb-2 h-6 w-32 rounded-md"
                  defaultValue={name}
                  size={11}>
                  </input>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th>Module :</th>
              <td>
                <button
                  id="micModule"
                  className="mb-2 text-center h-6 w-32 bg-white rounded-md">
                  {bot.module.type}
                </button>
              </td>
            </tr>
          </tbody>

          <tbody>
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

                  defaultValue={bot.targetPose.position.at(0)}
                  onChange={() => {
                    xValRangeElemRef.current!.value = xValInputElemRef.current!.value
                    preset.state[botID].targetPose.position[0] = parseInt(xValInputElemRef.current!.value)
                    _.debounce(function() {
                      services?.updatePreset.callback({ presetId: presetID, preset: preset });
                    }, 1000)
                    // Undercore_.debounce(update({ presetID: presetID, newPreset: preset }), 1000)
                    // Undercore_

                  }}

                ></input>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th> </th>
              <td>
                <input
                  ref={xValRangeElemRef}
                  type={"range"}
                  id={"micXRange"}
                  className={"mb-2 h-6 w-32"}
                  min={0}
                  max={100}
                  defaultValue={bot.targetPose.position.at(0)}
                  step={1}
                  onChange={() => {
                    // When the range input is changed, useRef to get the input element
                    // and set the value of the input element to the value of the range input
                    xValInputElemRef.current!.value = xValRangeElemRef.current!.value
                    preset.state[botID].targetPose.position[0] = parseInt(xValRangeElemRef.current!.value)
                    _.debounce(function() {
                      services?.updatePreset.callback({ presetId: presetID, preset: preset });
                    }, 1000)

                  }}
                ></input>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>

              <th>Y :</th>
              <td>
                <input
                  ref={yValInputElemRef}
                  type={"number"}
                  id={"micY"}
                  className={"text-center mb-2 h-6 w-32 rounded-md"}
                  min={0}
                  max={100}
                  defaultValue={bot.targetPose.position.at(1)}
                  onChange={() => {
                    yValRangeElemRef.current!.value = yValInputElemRef.current!.value
                    preset.state[botID].targetPose.position[1] = parseInt(yValInputElemRef.current!.value)
                    _.debounce(function() {
                      services?.updatePreset.callback({ presetId: presetID, preset: preset });
                    }, 1000)

                  }}


                ></input>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th> </th>
              <td>
                <input
                  ref={yValRangeElemRef}
                  type={"range"}
                  id={"micXRange"}
                  className={"mb-2 h-6 w-32"}
                  min={0}
                  max={100}
                  defaultValue={bot.targetPose.position.at(1)}
                  step={1}

                  onChange={() => {
                    yValInputElemRef.current!.value = yValRangeElemRef.current!.value
                    preset.state[botID].targetPose.position[1] = parseInt(yValInputElemRef.current!.value)
                    _.debounce(function() {
                      services?.updatePreset.callback({ presetId: presetID, preset: preset });
                    }, 1000)
                  }}
                // onChange = {() => {
                //   document.getElementById("micX").innerText = document.getElementById("micXRange")
                // }}
                ></input>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th>Angle :</th>
              <td>
                <input
                  ref={angleinputElemRef}
                  type={"number"}
                  id={"AngleInput"}
                  className={"mb-2 h-6 w-32 text-center rounded-md"}
                  min={0}
                  max={180}
                  defaultValue={0} //TODO get angle from bot
                  step={1}
                  onChange={() => {
                    // When the range input is changed, useRef to get the input element
                    // and set the value of the input element to the value of the range input
                    angleRangeElemRef.current!.value = angleinputElemRef.current!.value
                    _.debounce(function() {
                      services?.updatePreset.callback({ presetId: presetID, preset: preset });
                    }, 1000)
                  }}
                ></input>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th> </th>
              <td>
                <input
                  ref={angleRangeElemRef}
                  type={"range"}
                  id={"AngleRange"}
                  className={"mb-2 h-6 w-32 "}
                  min={0}
                  max={180}
                  defaultValue={0}
                  step={1}

                  onChange={() => {
                    angleinputElemRef.current!.value = angleRangeElemRef.current!.value
                    _.debounce(function() {
                      services?.updatePreset.callback({ presetId: presetID, preset: preset });
                    }, 1000)
                  }}
                ></input>
              </td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>

  )
}