import {TopicServer} from "webtopics";
import { Server } from "socket.io";
import { createPresetCommandService } from "./Channels/presetCommandService";
import { CreatePresetCommand } from "./command/StageServiceCommand/CreatePresetCommand";
import { Context } from "./controller/Context";
import { TopicClient } from "webtopics";
import { preset } from "../../schema";
import {io} from "socket.io-client"
import { Controller } from "./controller/Controller";
const dummyCreatePresetSocket=io("http://localhost:3000");
const dummyCreatePresetClient =  new TopicClient(dummyCreatePresetSocket);
const socketIOServer = new Server(3000);
const topicServer = new TopicServer(socketIOServer);
const context = new Context();
const controller = new Controller();
const dummyPreset :preset= {
    name:"preset1",
    poses:[]
}
topicServer.srv(createPresetCommandService, (preset) => {
    const cP = new CreatePresetCommand(preset)
    return cP.execute(context)
})

dummyCreatePresetClient.req(createPresetCommandService,dummyPreset,dummyCreatePresetClient.serverID as string).then((response) =>{
    console.log(`dummyCreatePresetClient received response ${JSON.stringify(response)}`)
}

).catch((error) => {
       console.log(`dummyCreatePresetClient received error: ${error}`)
   })
