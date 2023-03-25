import _ from "lodash";
import { useCallback, useRef, useContext, useState } from "react"
import { BotState, FleetState, getRecallFleetState, RecallFleetState } from 'schema';
import { rgbToHex } from "../../../utils/rgbToHex";
import { TopicContext, ServiceContext } from "../../../contexts/ServerContext";
import componentSelectContext from "../../../contexts/ComponentSwitchContext";
import { hexTorgb } from "../../../utils/hexTorgb";

/**
 * Component for displaying and editing the live attributes of a bot
 */
export default function LiveBotAttributesEditor({ bot, botID }: { bot: BotState, botID: string }) {
  const xValInputElemRef = useRef<HTMLInputElement>(null)
  const xValRangeElemRef = useRef<HTMLInputElement>(null)
  const yValInputElemRef = useRef<HTMLInputElement>(null)
  const yValRangeElemRef = useRef<HTMLInputElement>(null)
  const angleinputElemRef = useRef<HTMLInputElement>(null)
  const angleRangeElemRef = useRef<HTMLInputElement>(null)
  const nameInputElemRef = useRef<HTMLInputElement>(null)
  const ledColorElemRef = useRef<HTMLInputElement>(null)
  const ledAnimationElemRef = useRef<HTMLSelectElement>(null)
  const flashingFrequencyElemRef = useRef<HTMLInputElement>(null)
  const [ledAnimationInput, setLedAnimationInput] = useState(bot.ledState.base.ledAnimation.animationMode)
  const { setComponentSelect } = useContext(componentSelectContext);

  const services = useContext(ServiceContext);
  const provider = useContext(TopicContext);
  if (provider === null) {
    throw new Error("Provider not found")
  }
  const fleet = provider.fleet

  const fleetUpdate = useCallback(
    _.debounce((newFleet: FleetState) => {
      console.log("Updating fleet")
      console.log(newFleet)
      // console.log(newFleet)
      services?.recallFleetState.callback(getRecallFleetState(newFleet))

    }, 100, { "leading": false, "trailing": true, 'maxWait': 100 })
    , [services?.recallFleetState])
  return (
    fleet !== undefined ? (
      <div className="h-full overflow-clip">
        <div className="h-full w-full p-2 overflow-y-auto flex flex-col">
          <button className=" w-16 rounded cursor-pointer p-3 ui-shadow ui-hover-highlight " onClick={() => {
            setComponentSelect({ type: "mic_panel", presetID: null })
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
                    ref={nameInputElemRef}
                    className="text-center"
                    defaultValue={bot.name}
                    size={11}
                    onChange={() => {
                      fleet[botID].name = nameInputElemRef.current!.value
                      fleetUpdate(fleet)
                    }} ></input>
                </td>
              </tr>

              <tr>
                <th>Status</th>
                <td>
                  <button
                    className="text-center mb-2 h-6 w-32 "
                    id="micStatus">
                    {bot.status}
                  </button>
                </td>
              </tr>

              <tr>
                <th>Module</th>
                <td>
                  <button
                    className="text-center mb-2 h-6 w-32 "
                    id="micModule">

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

                    defaultValue={bot.targetPose.position.at(0)}
                    onChange={() => {
                      const xVal = parseInt(xValInputElemRef.current!.value)
                      if (xVal <= 100 && xVal >= 0) {
                        xValRangeElemRef.current!.value = xValInputElemRef.current!.value
                        fleet[botID].targetPose.position[0] = xVal
                        fleetUpdate(fleet)
                      } else {
                        alert("X value must be between 0 and 100")
                        xValInputElemRef.current!.value = xValRangeElemRef.current!.value
                      }


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
                    defaultValue={bot.targetPose.position.at(0)!}
                    step={1}
                    onChange={() => {
                      // When the range input is changed, useRef to get the input element
                      // and set the value of the input element to the value of the range input
                      xValInputElemRef.current!.value = xValRangeElemRef.current!.value
                      fleet[botID].targetPose.position[0] = parseInt(xValRangeElemRef.current!.value)

                      fleetUpdate(fleet)
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
                    defaultValue={bot.targetPose.position.at(2)!}
                    onChange={() => {

                      const yVal = parseInt(yValInputElemRef.current!.value)
                      if (yVal <= 100 && yVal >= 0) {
                        yValRangeElemRef.current!.value = yValInputElemRef.current!.value
                        fleet[botID].targetPose.position[2] = parseInt(yValInputElemRef.current!.value)
                        fleetUpdate(fleet)
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
                    defaultValue={bot.targetPose.position.at(2)!}
                    step={1}

                    onChange={() => {
                      yValInputElemRef.current!.value = yValRangeElemRef.current!.value
                      fleet[botID].targetPose.position[2] = parseInt(yValRangeElemRef.current!.value)

                      fleetUpdate(fleet)
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
                    defaultValue={0}
                    step={1}
                    onChange={() => {
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
                    ref={angleRangeElemRef}
                    type={"range"}
                    id={"AngleRange"}
                    min={0}
                    max={180}
                    defaultValue={0}
                    step={1}

                    onChange={() => {
                      angleinputElemRef.current!.value = angleRangeElemRef.current!.value
                    }}
                  ></input>
                </td>
              </tr>

              <tr >
                <th>Battery</th>
                <td>
                  <button className="text-center h-6 w-32">
                    30%
                  </button>
                </td>
              </tr>

              <tr>
                <th>LED </th>
                <td>
                  <input
                    type="color"
                    defaultValue={rgbToHex(fleet[botID].ledState.base.rgbValue.map((x) => x * 255))}
                    id="ledColor"
                    ref={ledColorElemRef}
                    size={15}

                    onChange={() => {
                      const hex = ledColorElemRef.current!.value

                      fleet[botID].ledState.base.rgbValue = hexTorgb(hex)

                      fleetUpdate(fleet)
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
                        fleet[botID].ledState.base.ledAnimation = { flashingFrequency: 0, animationMode: "constant" }
                        setLedAnimationInput("constant")
                      } else {
                        fleet[botID].ledState.base.ledAnimation = { flashingFrequency: 5, animationMode: "flashing" }
                        setLedAnimationInput("flashing")
                      }
                      fleetUpdate(fleet)
                    }}>
                    <option value="constant" className="bg-zinc-700">Constant</option>
                    <option value="flashing" className="bg-zinc-700" >Flashing</option>

                  </select>
                </td>
              </tr>

              {ledAnimationInput === "flashing" ? (
                <tr>
                  <th>Frequency</th>
                  <td>
                    <input
                      ref={flashingFrequencyElemRef}
                      type={"number"}
                      id={"flashingFrequency"}
                      min={1}
                      max={10}
                      defaultValue={fleet[botID].ledState.base.ledAnimation.flashingFrequency}
                      onChange={() => {
                        if (parseInt(flashingFrequencyElemRef.current!.value) > 10 || parseInt(flashingFrequencyElemRef.current!.value) < 1) {
                          alert("Flashing frequency must be between 1 and 10")
                          flashingFrequencyElemRef.current!.value = fleet[botID].ledState.base.ledAnimation.flashingFrequency?.toString()!
                        } else {
                          fleet[botID].ledState.base.ledAnimation.flashingFrequency = parseInt(flashingFrequencyElemRef.current!.value)
                          fleetUpdate(fleet)
                        }
                      }}
                    ></input>
                  </td>
                </tr>
              ) : null}

            </tbody>

          </table>
        </div>
      </div>
    ) : null
  )
}




