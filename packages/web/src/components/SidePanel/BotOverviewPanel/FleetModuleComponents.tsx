import { Fragment } from "react";
import { BotState, FleetState, Preset, RecallBotState } from "schema";
import NumberAndBarInput from "../../../utils/NumberAndBarInput";


export default function FleetModuleComponents({bot, fleet, fleetUpdate, botID}: { bot : BotState, fleet: FleetState, fleetUpdate: (fleet: FleetState) => void, botID: string}) {
    if( bot.module.type === "micStand"){
        return (
            <Fragment>
            <NumberAndBarInput
                title="Mic Angle"
                value={bot.module.state?.gripAngle!}
                setValue={(value: number) => {
                  fleet[botID].module.state!.gripAngle = value
                  fleetUpdate(fleet)
                }}
                boundary={{ min: 0, max: 180 }} />

              <NumberAndBarInput
                title="Mic Height"
                value={bot.module.state!.gripPosition}
                setValue={(value: number) => {
                  fleet[botID].module.state!.gripPosition = value
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
