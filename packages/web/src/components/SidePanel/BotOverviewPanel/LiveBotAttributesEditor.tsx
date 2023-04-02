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
export default function LiveBotAttributesEditor({ botID }: { botID: string }) {
  const services = useContext(ServiceContext);
  const provider = useContext(TopicContext);
  if (provider === null) {
    throw new Error("Provider not found")
  }
  const fleet = provider.fleet
  if (fleet === undefined) {
    throw new Error("fleet not found")
  }

  const bot = fleet[botID]
  const ledColorElemRef = useRef<HTMLInputElement>(null)
  const ledAnimationElemRef = useRef<HTMLSelectElement>(null)
  const { setComponentSelect } = useContext(componentSelectContext);



  const fleetUpdate = useCallback(
    _.debounce((newFleet: FleetState) => {
      console.log("Updating fleet")
      console.log(newFleet)
      // console.log(newFleet)
      services?.recallFleetState.callback(getRecallFleetState(newFleet))

    }, 100, { "leading": false, "trailing": true, 'maxWait': 100 })
    , [services?.recallFleetState])
  return (
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

              <ReadOnlyAttribute title="Name" value={bot.name} />

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
                boundary={{ min: -5, max: 5 }} />

              <NumberAndBarInput
                title="Y"
                value={bot.targetPose.position.at(2)!}
                setValue={(value: number) => {
                  fleet[botID].targetPose.position[2] = value
                  fleetUpdate(fleet)
                }}
                boundary={{ min: -5, max: 5 }} />

              <NumberAndBarInput
                title="bot Rotation"
                value={bot.targetPose.quaternion.at(0)! * 180 / Math.PI}
                setValue={(value: number) => {
                  const rad = value * Math.PI / 180

                  fleet[botID].targetPose.quaternion[0] = rad
                  fleetUpdate(fleet)
                }}
                boundary={{ min: 0, max: 360 }} />

              <FleetModuleComponents bot={bot} fleet={fleet} fleetUpdate={fleetUpdate} botID={botID} />

              <tr>
                <th>LED </th>
                <td>
                  <input
                    type="color"
                    value={rgbToHex(fleet[botID].ledState.base.rgbValue.map((x) => x * 255))}
                    id="ledColor"
                    className="h-8 p-0 b-0"
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
                    value={bot.ledState.base.ledAnimation.animationMode}
                    ref={ledAnimationElemRef}
                    onChange={() => {
                      if (ledAnimationElemRef.current!.value === "constant") {
                        fleet[botID].ledState.base.ledAnimation = { flashingFrequency: 0, animationMode: "constant" }
                      } else {
                        fleet[botID].ledState.base.ledAnimation = { flashingFrequency: 1, animationMode: "flashing" }
                      }
                      fleetUpdate(fleet)
                    }}>
                    <option value="constant" className="bg-zinc-700">Constant</option>
                    <option value="flashing" className="bg-zinc-700" >Flashing</option>

                  </select>
                </td>
              </tr>

              {bot.ledState.base.ledAnimation.animationMode === "flashing" ? (
                <NumberAndBarInput
                  title="Frequency"
                  value={fleet[botID].ledState.base.ledAnimation.flashingFrequency!}
                  setValue={(value: number) => {
                    fleet[botID].ledState.base.ledAnimation.flashingFrequency = value
                    fleetUpdate(fleet)
                  }}
                  boundary={{ min: 1, max: 10 }} />
              ) : null}

            </tbody>

          </table>
        </div>
      </div>
    )
}




