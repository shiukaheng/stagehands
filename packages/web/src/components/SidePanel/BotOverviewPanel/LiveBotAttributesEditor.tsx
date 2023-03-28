import _ from "lodash";
import { useCallback, useRef, useContext, useState, Fragment } from "react"
import { BotState, FleetState, getRecallFleetState, RecallFleetState } from 'schema';
import { rgbToHex } from "../../../utils/rgbToHex";
import { hexTorgb } from "../../../utils/hexTorgb";
import NumberAndBarInput from "../../../utils/NumberAndBarInput"
import ReadOnlyAttribute from "../../../utils/ReadOnlyAttributes";
import { TopicContext, ServiceContext } from "../../../contexts/ServerContext";
import componentSelectContext from "../../../contexts/ComponentSwitchContext";
import FleetModuleComponents from "./FleetModuleComponents";
import { FaArrowLeft } from "react-icons/fa";

/**
 * Component for displaying and editing the live attributes of a bot
 */
export default function LiveBotAttributesEditor({ bot, botID }: { bot: BotState, botID: string }) {
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
          }
          }> <FaArrowLeft size={25} /></button>

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

              <ReadOnlyAttribute title="Status" value={bot.status} />

              <ReadOnlyAttribute title="Module" value={bot.module.type} />

              <ReadOnlyAttribute title="Battery" value={bot.batteryStatus.batteryPercentage + "%"} />

              <NumberAndBarInput
                title="X"
                value={bot.targetPose.position.at(0)!}
                setValue={(value: number) => {
                  fleet[botID].targetPose.position[0] = value
                  fleetUpdate(fleet)
                }}
                boundary={{ min: 0, max: 100 }} />

              <NumberAndBarInput
                title="Y"
                value={bot.targetPose.position.at(2)!}
                setValue={(value: number) => {
                  fleet[botID].targetPose.position[2] = value
                  fleetUpdate(fleet)
                }}
                boundary={{ min: 0, max: 100 }} />

              <FleetModuleComponents bot={bot} fleet={fleet} fleetUpdate={fleetUpdate} />

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




