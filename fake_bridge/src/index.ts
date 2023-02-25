import { createTopic, TopicServer } from "webtopics"
import { Server } from "socket.io"
import { z } from "zod"

const stageStateSchema = z.number();
const stageTopic = createTopic("stage", stageStateSchema)

const io = new Server(3000, {
    cors: {
        origin: "*",
    }
})

const topicServer = new TopicServer(io)
topicServer.pub(stageTopic, 0)

// Increment the stage every 1 second
setInterval(() => {
    topicServer.pub(stageTopic, (topicServer.getTopicSync(stageTopic) ?? 0) + 1)
    console.log("Incremented stage: ", topicServer.getTopicSync(stageTopic))
}, 1000)