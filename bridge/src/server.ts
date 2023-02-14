import {TopicServer} from "webtopics";
import { Server } from "socket.io";
import { createPresetCommandService } from "./Channels/presetCommandService";
import { CreatePresetCommand } from "./command/StageCommand/CreatePresetCommand";
import { Context } from "./controller/Context";
import { TopicClient } from "webtopics";
import { preset } from "../../schema/src/stage/stageState";
const dummyCreatePresetClient =  new TopicClient("http://localhost:3000");
const socketIOServer = new Server(3000);
const topicServer = new TopicServer(socketIOServer);
const context = new Context();
const dummyPreset :preset= {name:"preset1",
}
topicServer.srv(createPresetCommandService, (preset) => {
    const cP = new CreatePresetCommand(preset)
    return cP.execute(context)
}
dummyCreatePresetClient.req(createPresetCommandService,)

)
