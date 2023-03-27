import { Fragment } from "react";
import { BotState, FleetState, Preset, RecallBotState } from "schema";
import NumberAndBarInput from "../../../utils/NumberAndBarInput";


export default function FleetModuleComponents({bot, fleet, fleetUpdate}: { bot : BotState, fleet: FleetState, fleetUpdate: (fleet: FleetState) => void}) {
    if( bot.module.type === "micStand"){
        return (
            <Fragment>
            <NumberAndBarInput
                title="Mic Angle"
                value={bot.targetPose.quaternion[0]} //TODO not sure if this is the right value
                setValue={(value: number) => {
                  bot.targetPose.quaternion[0] = value
                  fleetUpdate(fleet)
                }}
                boundary={{ min: 0, max: 100 }} />

              <NumberAndBarInput
                title="Mic Height"
                value={bot.module.state!.gripPosition}
                setValue={(value: number) => {
                  bot.module.state!.gripPosition = value
                  fleetUpdate(fleet)
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
