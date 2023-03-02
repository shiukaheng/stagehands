import { TopicServer, createTopic,TopicClient } from "webtopics"
import{z} from "zod";
import { Server } from "socket.io";
import { io } from "socket.io-client";
// import { botPoseSchema } from "../../schema/src/bot/botState";
import { poseSchema } from "schema";
import test from "node:test";
const testSocket = io("http://localhost:3000");
const testClient = new TopicClient(testSocket);

const testSchema = z.string()
const testTopic = createTopic("testSchema", testSchema);
const socketIOServer = new Server(3000);

const topicServer = new TopicServer(socketIOServer);

const testData = "test";

topicServer.sub(testTopic, (data) => {
    console.log(`server received test data: ${JSON.stringify(data)}`);
    console.log(`Server ID: ${topicServer.getServerID()}`)
});

testClient.sub(testTopic, (data) => {
    console.log(`test client received test data: ${JSON.stringify(data)}`);
    console.log(`server ID: ${topicServer.getServerID()}`)
});

testClient.pub(testTopic,testData);
topicServer.getServerID().then((id) => {
    console.log("Connected to server with ID: " + id);
})