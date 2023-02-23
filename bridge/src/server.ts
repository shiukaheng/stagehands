import { TopicServer } from "webtopics";
import { Server } from "socket.io";
import { createPresetCommandService } from "./Channels/presetCommandServiceChannel";
import { CreatePresetCommand } from "./command/StageServiceCommand/CreatePresetCommand";
import { Context } from "./controller/Context";
import { TopicClient } from "webtopics";
import { Preset } from "../../schema";
import { io } from "socket.io-client";
import { Controller } from "./controller/Controller";

// Create test client
const testCreatePresetSocket = io("http://localhost:3000");
const testCreatePresetClient = new TopicClient(testCreatePresetSocket);

// Create test server
const socketIOServer = new Server(3000);
const topicServer = new TopicServer(socketIOServer);

// Create context and controller
const context = new Context();
const controller = new Controller();

// Create test preset
const testPreset: Preset = {
    name: "preset1",
    poses: []
};

// Set up createPresetCommandService
topicServer.srv(createPresetCommandService, (preset) => {
    const cP = new CreatePresetCommand(preset);
    return cP.execute(context);
});

// Try requesting createPresetCommandService
async function testRequest() {
    const serverID = await testCreatePresetClient.getServerID() // Wait for serverID to be received
    testCreatePresetClient
        .req(
            createPresetCommandService,
            testPreset,
            serverID
        )
        .then((response) => {
            console.log(
                `testCreatePresetClient received response ${JSON.stringify(response)}`
            );
        })
        .catch((error) => {
            console.log(`testCreatePresetClient received error: ${error}`);
        });
}

testRequest();