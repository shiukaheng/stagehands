import { Context } from "./controller/Context";
import { FleetState } from "schema";

/**
 * Handles updates to the fleet topic.
 * @param fleetState - The new state of the fleet.
 * @param context - The context object.
 */
export function fleetTopicHandler(fleetState: FleetState, context: Context): void {
  console.log(fleetState);
  
  context.setCurrentBotState(fleetState);
}
