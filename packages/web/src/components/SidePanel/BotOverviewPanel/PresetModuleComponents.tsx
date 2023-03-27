import { Fragment } from "react"
import { RecallBotState, Preset } from "schema"
import NumberAndBarInput from "../../../utils/NumberAndBarInput"

export default function PresetModuleComponents({bot, preset, presetUpdate}: { bot : RecallBotState, preset: Preset, presetUpdate: (id :string,fleet: Preset) => void}) {
    if( bot.module.type === "micStand"){
        return (
            <Fragment>
            <NumberAndBarInput
                title="Angle"
                value={0}
                setValue={(value: number) => {
                  // fleet[botID].targetPose.position[0] = value
                  // fleetUpdate(fleet)
                }}
                boundary={{ min: 0, max: 100 }} />

              <NumberAndBarInput
                title="Mic Height"
                value={0}
                setValue={(value: number) => {
                  // fleet[botID].targetPose.position[0] = value
                  // fleetUpdate(fleet)
                }}
                boundary={{ min: 0, max: 100 }} />
                </Fragment>

        )
    }else if (bot.module.type === "nullModule"){
        return (null)
    }else{
        return (null)
    }
}