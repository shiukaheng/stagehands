import { Fragment } from "react"
import { RecallBotState, Preset } from "schema"
import NumberAndBarInput from "../../../utils/NumberAndBarInput"

export default function PresetModuleComponents({bot, preset, presetID, presetUpdate}: { bot : RecallBotState, preset: Preset,presetID : string , presetUpdate: (id :string,fleet: Preset) => void}) {
    if( bot.module.type === "micStand"){
        return (
            <Fragment>
            <NumberAndBarInput
                title="Mic Angle"
                value={bot.targetPose.quaternion[0]} //TODO not sure if this is the right value
                setValue={(value: number) => {
                  bot.targetPose.quaternion[0] = value
                  presetUpdate(presetID, preset)
                }}
                boundary={{ min: 0, max: 100 }} />

              <NumberAndBarInput
                title="Mic Height"
                value={bot.module.state!.gripPosition}
                setValue={(value: number) => {
                  bot.module.state!.gripPosition = value
                  presetUpdate(presetID, preset)
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