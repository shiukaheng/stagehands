import { Context } from "./controller/Context";
import { UpdatePresetRequest, RecallFleetState, recallBotStateService, stopService, clearStopService, LEDState, OverWriteBotLEDRequest, LEDOverwriteService, restoreLEDService, Preset, stageTopic, CreatePresetReturn, botPairingService, BotConnectionStatus, botDisconnectionService, botConnectionStatusTopic, fleetTopic } from "schema";
import { v4 } from "uuid";
import { checkValidRecall } from "./utils/ValidationFunc";
import { TopicClient, TopicServer } from "webtopics";
import { retrieveIps } from "utils";
/**
 * Create a new preset.
 * @param preset - The preset to be created.
 * @param context - The controller context.
 * @param server - The TopicServer instance.
 * @returns The result of the creation as a string.
 */
export function createPresetServiceHandler(preset: Preset, context: Context, server: TopicServer): string {
    checkValidRecall(preset.state, context);
    const presetID = v4();
    context.getStageState().presets = [
        ...context.getStageState().presets,
        {
            id: presetID,
            value: preset
        }
    ];

    server.pub(stageTopic, context.getStageState());
    console.log("preset created");
    
    return "created" as CreatePresetReturn;
}

/**
 * Delete a preset.
 * @param presetID - The ID of the preset to be deleted.
 * @param context - The controller context.
 * @param server - The TopicServer instance.
 */
export function deletePresetServiceHandler(presetID: string, context: Context, server: TopicServer): void {
    context.getStageState().presets = context.getStageState().presets.filter(preset => preset.id !== presetID);
    server.pub(stageTopic, context.getStageState());
    console.log("preset deleted");
}

/**
 * Update a preset.
 * @param updatePresetRequest - The request containing the updated preset.
 * @param context - The controller context.
 * @param server - The TopicServer instance.
 */
export function updatePresetServiceHandler(updatePresetRequest: UpdatePresetRequest, context: Context, server: TopicServer): void {
    checkValidRecall(updatePresetRequest.preset.state, context);
    const presetIndex = context.getStageState().presets.findIndex(preset => preset.id === updatePresetRequest.presetId);
    if (presetIndex === -1) {
        throw new Error("Preset does not exist");
    }
    context.getStageState().presets[presetIndex].value = updatePresetRequest.preset;
    server.pub(stageTopic, context.getStageState());
    console.log("preset updated");
}

/**
 * Trigger an emergency stop for all bots.
 * @param requestData - The request data (unused).
 * @param context - The controller context.
 * @param server - The TopicServer instance.
 */
export function emergencyStopServiceHandler(requestData: undefined, context: Context, server: TopicServer) {
    const errors = [];
    for (const botID in context.getCurrentBotState()) {
        try {
            stopBotServiceHandler(botID, context, server);
        } catch (error) {
            errors.push(error);
        }
    }
    throw new AggregateError(errors);
}

/**
 * Clear the emergency stop for all bots.
 * @param requestData - The request data (unused).
 * @param context - The controller context.
 * @param server - The TopicServer instance.
 */
export function emergencyStopClearServiceHandler(requestData: undefined, context: Context, server: TopicServer) {
    const errors = [];
    for (const botID in context.getCurrentBotState()) {
        try {
            stopBotClearServiceHandler(botID, context, server);
        }
        catch (error) {
            errors.push(error);
        }
    }
    console.log("emergencyStopClearService called");
    throw new AggregateError(errors);
}
/**
 * Stops a particular bot.
 * @param botID - The ID of the bot to stop.
 * @param context - The context object.
 * @param server - The topic server.
 * @throws An error if the bot does not exist.
 */
export async function stopBotServiceHandler(
    botID: string,
    context: Context,
    server: TopicServer
): Promise<void> {
    if (!context.getCurrentBotState().hasOwnProperty(botID)) {
        throw new Error(`Bot ${botID} does not exist`);
    }
    try {
        server
            .req(stopService, botID as string)
            .then(() => {
                // context.getTargetBotState()[botName].stopped = true;
            })
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        throw error;
    }
    console.log("stopBot service called");
    
}

/**
 * Clears the stop state for a particular bot.
 * @param botID - The ID of the bot to clear the stop state for.
 * @param context - The context object.
 * @param server - The topic server.
 * @throws An error if the bot does not exist.
 */
export async function stopBotClearServiceHandler(
    botID: string,
    context: Context,
    server: TopicServer
): Promise<void> {
    if (!context.getCurrentBotState().hasOwnProperty(botID)) {
        throw new Error(`Bot ${botID} does not exist`);
    }
    try {
        server
            .req(clearStopService, botID as string)
            .then(() => {
                // context.getTargetBotState()[botName].stopped = false;
            })
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        throw error;
    }
    console.log("stopBotClear service called");
}

/**
 * Recalls the state of a fleet of bots.
 * @param recallFleetState - An object containing the state to recall for each bot.
 * @param context - The context object.
 * @param server - The topic server.
 * @throws An error if any error is thrown while recalling bot states.
 */
export async function recallFleetStateServiceHandler(recallFleetState: RecallFleetState, context: Context, server: TopicServer): Promise<void> {
    const errors = [];

    for (const [botID, recallBotState] of Object.entries(recallFleetState)) {
        try {
            checkValidRecall(recallFleetState, context);
            server.req(recallBotStateService, botID, recallBotState)
                .catch((error) => {
                    errors.push(error);
                });
        } catch (error) {
            errors.push(error);
        }
    }
    if (errors.length !== 0) {
        throw new Error(`An error occurred while recalling bot states: ${errors}`);
    }
}


//Overwrite particular bot LED

/**
 * Overwrites the LED state of a particular bot.
 * @param overWriteBotLEDRequest - An object containing the ID of the bot and the new LED state.
 * @param context - The context object.
 * @param server - The topic server.
 * @throws An error if the bot does not exist.
 */
export async function overWriteBotLEDServiceHandler(
    overWriteBotLEDRequest: OverWriteBotLEDRequest,
    context: Context,
    server: TopicServer
): Promise<void> {
    const botID = overWriteBotLEDRequest.botID;
    if (!context.getCurrentBotState().hasOwnProperty(botID)) {
        throw new Error(`Bot ${botID} does not exist`);
    }
    try {
        server.req(LEDOverwriteService, botID, overWriteBotLEDRequest.ledState)
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        throw error;
    }
}
/**
 * Overwrites the LED state of all bots.
 * @param LEDState - The new LED state for all bots.
 * @param context - The context object.
 * @param server - The topic server.
 * @throws An error if any error is thrown while overwriting bot LED states.
 */
export async function overWriteLEDServiceHandler(
    LEDState: LEDState,
    context: Context,
    server: TopicServer
): Promise<void> {
    const errors = [];
    for (const botID in context.getCurrentBotState()) {
        try {
            const overWriteBotLEDRequest = { botID: botID, ledState: LEDState };
            overWriteBotLEDServiceHandler(overWriteBotLEDRequest, context, server);
        } catch (error) {
            errors.push(error);
        }
    }
    if (errors.length !== 0) {
        throw new Error(`An error occurred while overwriting bot LED states: ${errors}`);
    }
}

/**
 * Clears the LED overwrite state for a particular bot.
 * @param botID - The ID of the bot to clear the LED overwrite state for.
 * @param context - The context object.
 * @param server - The topic server.
 * @throws An error if the bot does not exist.
 */
export async function clearBotLEDOverwriteServiceHandler(
    botID: string,
    context: Context,
    server: TopicServer
): Promise<void> {
    if (!context.getCurrentBotState().hasOwnProperty(botID)) {
        throw new Error(`Bot ${botID} does not exist`);
    }
    try {
        server.req(restoreLEDService, botID)
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        throw error;
    }
}
/**
 * Clears the LED overwrite state for all bots.
 * @param requestData - Unused.
 * @param context - The context object.
 * @param server - The topic server.
 * @throws An error if any error is thrown while clearing bot LED overwrite states.
 */
export async function clearLEDOverwriteServiceHandler(
    requestData: undefined,
    context: Context,
    server: TopicServer
): Promise<void> {
    const errors = [];
    for (const botID in context.getCurrentBotState()) {
        try {
            clearBotLEDOverwriteServiceHandler(botID, context, server);
        } catch (error) {
            errors.push(error);
        }
    }
    if (errors.length !== 0) {
        throw new Error(`An error occurred while clearing bot LED overwrite states: ${errors}`);
    }
}

/**
 * Runs a preset for all bots.
 * @param presetID - The ID of the preset to run.
 * @param context - The context object.
 * @param server - The topic server.
 * @throws An error if the preset does not exist.
 */
export function runPresetServiceHandler(
    presetID: string,
    context: Context,
    server: TopicServer
): void {
    const preset = context.getStageState().presets.find(preset => preset.id === presetID);
    if (!preset) {
        throw new Error("Preset does not exist");
    }
    context.getStageState().activePreset = presetID;
    recallFleetStateServiceHandler(preset.value.state, context, server);
    server.pub(stageTopic, context.getStageState());
}

/**
 * Reorders the list of presets.
 * @param presetIDs - The new order of preset IDs.
 * @param context - The context object.
 * @param server - The topic server.
 * @throws An error if any of the preset IDs are invalid.
 */
export function reorderPresetsServiceHandler(
    presetIDs: string[],
    context: Context,
    server: TopicServer
  ): void {
    const currentSet = new Set(context.getStageState().presets.map(preset => preset.id));
    if (presetIDs.length !== currentSet.size || !presetIDs.every(id => currentSet.has(id))) {
      throw new Error("Invalid preset ID list");
    } else {
      // Reorder the presets
      const newPresets: { id: string, value: Preset }[] = [];
      for (const id of presetIDs) {
        const preset = context.getStageState().presets.find(preset => preset.id === id);
        if (preset) {
          newPresets.push(preset);
        } else {
          throw new Error("Preset does not exist");
        }
      }
      context.getStageState().presets = newPresets;
      server.pub(stageTopic, context.getStageState());
      console.log("Reordered presets");
    }
  }
  
  /**
   * Connects a bot to the server.
   * @param botName - The name of the bot to connect.
   * @param context - The context object.
   * @param server - The topic server.
   */
  export async function connectBotServiceHandler(
    botName: string,
    context: Context,
    server: TopicServer
  ): Promise<void> {
    const pairingClient = context.getAvailableBotNameTopicClientMap().get(botName);
    if (!pairingClient) {
      throw new Error("Bot does not exist");
    }
    const botConnectionStatus = context.getBotConnectionState()[botName];
    if (botConnectionStatus === "connected") {
      throw new Error("Bot is already connected");
    }
    console.log("connecting");
    
    const serverId = await pairingClient?.getServerID() as string;
    const ips = retrieveIps();
    let successRequest = true;
    for (const ip of ips) {
      await pairingClient?.req(botPairingService, serverId, { bridgeIp: ip, bridgePort: context.getServerPort() })
        .catch((error) => {
          successRequest = false;
        });
    }
    if (successRequest) {
        context.getBotConnectionState()[botName] = "connected";
    }
    server.pub(botConnectionStatusTopic,context.getBotConnectionState());
  }
 export async function disconnectBotServiceHandler(
    botName:string,
    context: Context,
    server: TopicServer
 ):Promise<void>{
    console.log(context.getBotConnectionState());
    
    if (!context.getBotConnectionState()[botName]) {
        throw new Error(`Bot ${botName} does not exist`);
    }
    //const botName = context.getCurrentBotState()[botID].name;
    const botConnectionStatus = context.getBotConnectionState()[botName]
    if (botConnectionStatus === "disconnected") {
        throw new Error("Bot is already disconnected");
    }
    let currentBotClient =context.getAvailableBotNameTopicClientMap().get(botName) as TopicClient
    //console.log(currentBotClient);
    
    const serverID = await currentBotClient.getServerID();
    currentBotClient.req(botDisconnectionService,serverID as string)
    .then(()=>{
        context.getBotConnectionState()[botName]= "disconnected";
        for(const botID of Object.keys(context.getCurrentBotState())){
            if(context.getCurrentBotState()[botID].name===botName){
                console.log(`${botName} disconnected`);
                
                delete context.getCurrentBotState()[botID]
                
                console.log(context.getCurrentBotState());
                console.log(context.getCurrentBotState());
                // server.pub(fleetTopic,context.getCurrentBotState(), true, true);
                server.pubDiff(fleetTopic, {
                    modified: undefined,
                    // @ts-ignore type hack
                    deleted: {
                        [botID]: null
                    }
                })
            }
        }
    })
    .catch((error)=>{
        throw error;
    })
    console.log("debug connectionState");
    
    console.log(context.getBotConnectionState());
    
    server.pub(botConnectionStatusTopic,context.getBotConnectionState());

 }