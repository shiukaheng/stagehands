import { TopicServer, createTopic } from "webtopics"
import { Server } from "socket.io";
// import { botPoseSchema } from "../../schema/src/bot/botState";
import { botPoseSchema } from "../../schema";

const botPoseTopic = createTopic("botPose", botPoseSchema);
const socketIOServer = new Server(3000);

const topicServer = new TopicServer(socketIOServer);

topicServer.sub(botPoseTopic, (data) => {
    console.log(`Received bot pose: ${JSON.stringify(data)}`);
});

topicServer.getServerID().then((id)=>{
    console.log("Connected to server with ID: " + id);
})