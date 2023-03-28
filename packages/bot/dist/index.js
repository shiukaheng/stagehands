/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst manager_1 = __webpack_require__(/*! ./manager */ \"./src/manager.ts\");\nconst manager = new manager_1.StagehandsManager();\n\n\n//# sourceURL=webpack://bot/./src/index.ts?");

/***/ }),

/***/ "./src/interface.ts":
/*!**************************!*\
  !*** ./src/interface.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.WebtopicROSInterface = void 0;\nconst rosnodejs_1 = __importDefault(__webpack_require__(/*! rosnodejs */ \"rosnodejs\"));\nconst webtopics_1 = __webpack_require__(/*! webtopics */ \"webtopics\");\nconst socket_io_client_1 = __importDefault(__webpack_require__(/*! socket.io-client */ \"socket.io-client\"));\nconst schema_1 = __webpack_require__(/*! schema */ \"schema\");\nconst current_pose = rosnodejs_1.default.require('stagehands_ros').msg.robotCurrentPose;\nconst target_pose_service = rosnodejs_1.default.require('stagehands_ros').srv.setTargetPose;\nclass WebtopicROSInterface {\n    constructor(ip, port) {\n        this.nodeHandle = null;\n        this.connectedToROSResolver = null;\n        this.connectedToROS = new Promise((resolve, reject) => {\n            this.connectedToROSResolver = resolve;\n        });\n        this.initBotState = {\n            name: \"alice\",\n            pose: {\n                position: [0, 0, 0],\n                quaternion: [0, 0, 0, 1]\n            },\n            targetPose: {\n                position: [0, 0, 0],\n                quaternion: [0, 0, 0, 1]\n            },\n            ledState: {\n                base: {\n                    rgbValue: [0, 0, 0],\n                    ledAnimation: {\n                        animationMode: \"constant\",\n                        flashingFrequency: 0\n                    }\n                }\n            },\n            status: \"idle\",\n            module: {\n                type: \"nullModule\",\n                state: null,\n                moduleModels: {}\n            },\n            stopped: false,\n            batteryStatus: {\n                batteryPercentage: 0\n            }\n        };\n        this.ioClient = (0, socket_io_client_1.default)(\"http://\" + ip + \":\" + port);\n        this.client = new webtopics_1.TopicClient(this.ioClient, { logTopics: true });\n    }\n    /**\n     * Start the ros node and webtopics client\n     */\n    startNode() {\n        // instantiate ros node named 'interface'\n        rosnodejs_1.default.initNode('interface').then((nodeHandle) => {\n            // create a TopicClient for the main server\n            this.nodeHandle = nodeHandle;\n            this.connectedToROSResolver(true);\n            console.log(\"Connecting to server...\");\n            this.client.getServerID().then((id) => {\n                console.log(\"Server ID: \", id);\n            });\n            // start publishing bot's current location over webtopics\n            this.currentPosePublisher();\n            // create WebTopics service to send bot to required position\n            this.targetPoseSender();\n        });\n    }\n    /**\n     * Publishes the bot's current state to the fleet topic, taken from ROS\n     */\n    currentPosePublisher() {\n        if (this.nodeHandle === null) {\n            throw new Error(\"Node handle is null\");\n        }\n        // subscribe to robot_current_pose ROS topic and receive message containing robot's current position\n        let mod;\n        mod = {\n            type: \"nullModule\",\n            state: null,\n            moduleModels: {}\n        };\n        let sub = this.nodeHandle.subscribe('robot_current_pose', current_pose, (data) => {\n            // check if a mic module is actually connected (although this is a potential thing to watch out for:\n            // the python ros node actually publishing on this topic stores the mic height as NONE if there\n            // isn't a module attached)\n            if (data.currentMicHeight != null) {\n                mod.type = \"micStand\";\n                mod.state = { gripPosition: data.currentMicHeight };\n            }\n            // define schema containing bot current location\n            this.initBotState.pose.position = [data.xPos, 0, data.yPos];\n            this.initBotState.pose.quaternion = data.rotationQuaternion;\n            // publish to fleet topic\n            this.client.pub(schema_1.fleetTopic, {\n                [this.client.id]: this.initBotState\n            });\n        });\n    }\n    /**\n     * Function that takes a recall bot state schema as input and executes it on the robot\n     */\n    targetPoseSender() {\n        // creates a service\n        this.client.srv(schema_1.recallBotStateService, (data) => {\n            if (this.nodeHandle === null) {\n                throw new Error(\"Node handle is null\");\n            }\n            else {\n                this.sendPose(data);\n            }\n        });\n    }\n    sendPose(data) {\n        if (this.nodeHandle === null) {\n            throw new Error(\"Node handle is null\");\n        }\n        else {\n            // Gets service client for ROS service to set robot's target pose\n            let serviceClient = this.nodeHandle.serviceClient('set_target_pose', target_pose_service);\n            // Set values in request object based on input schema\n            let requestedPose = new target_pose_service.Request();\n            // Set position and rotation values\n            requestedPose.xPos = data.targetPose.position[0];\n            requestedPose.yPos = data.targetPose.position[2];\n            requestedPose.rotationQuaternion = data.targetPose.quaternion;\n            // Set LED values\n            requestedPose.ledRGBColour = data.baseLEDState.rgbValue;\n            requestedPose.ledAnimation = data.baseLEDState.ledAnimation.animationMode;\n            requestedPose.flashFrequency = data.baseLEDState.ledAnimation.flashingFrequency;\n            if (data.module.state != null) {\n                requestedPose.micHeight = data.module.state.gripPosition;\n            }\n            else {\n                requestedPose.micHeight = null;\n            }\n            console.log(\"Received:\", data);\n            console.log(\"Sending:\", requestedPose);\n            // Call ROS service to move the robot\n            serviceClient.call(requestedPose).then((resp) => { console.log(resp); });\n        }\n    }\n    waitForConnection() {\n        return this.connectedToROS;\n    }\n    shutdown() {\n        this.ioClient.disconnect();\n        rosnodejs_1.default.shutdown();\n    }\n}\nexports.WebtopicROSInterface = WebtopicROSInterface;\n// // Create a new instance of the class and start the node\n// let rosInterface = new WebtopicROSInterface(\"192.168.0.37\", \"3001\")\n// rosInterface.startNode()\n\n\n//# sourceURL=webpack://bot/./src/interface.ts?");

/***/ }),

/***/ "./src/manager.ts":
/*!************************!*\
  !*** ./src/manager.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.StagehandsManager = exports.defaultOptions = void 0;\nconst interface_1 = __webpack_require__(/*! ./interface */ \"./src/interface.ts\");\nconst utils_1 = __webpack_require__(/*! utils */ \"utils\");\nexports.defaultOptions = {\n    pairingPort: 3435,\n};\nclass StagehandsManager {\n    constructor(options = {}) {\n        // Interface for communicating with web UI\n        this.interface = null;\n        this.options = exports.defaultOptions;\n        console.log(\"🎤 Stagehands Manager\");\n        this.options = Object.assign(Object.assign({}, exports.defaultOptions), options); // Merge options with defaults\n        console.log(\"🔌 Pairing port:\", this.options.pairingPort);\n        this.pairingClient = new utils_1.PairingClient({\n            pairingPort: this.options.pairingPort,\n        });\n        // console.log(\"🔌 Advertising bot\");\n        this.pairingClient.startAdvertise();\n        this.pairingClient.subscribeRequest(this.onRequestConnect);\n        this.pairingClient.subscribeDisconnect(this.onRequestDisconnect);\n    }\n    onRequestDisconnect() {\n        var _a;\n        console.log(\"💔 Disconnected from web UI\");\n        (_a = this.interface) !== null && _a !== void 0 ? _a : this.interface.shutdown();\n        this.interface = null;\n    }\n    onRequestConnect(args) {\n        console.log(\"🔌 Request to connect from\", args.bridgeIp);\n        this.interface = new interface_1.WebtopicROSInterface(args.bridgeIp, args.bridgePort.toString());\n    }\n}\nexports.StagehandsManager = StagehandsManager;\n\n\n//# sourceURL=webpack://bot/./src/manager.ts?");

/***/ }),

/***/ "rosnodejs":
/*!****************************!*\
  !*** external "rosnodejs" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("rosnodejs");

/***/ }),

/***/ "schema":
/*!*************************!*\
  !*** external "schema" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("schema");

/***/ }),

/***/ "socket.io-client":
/*!***********************************!*\
  !*** external "socket.io-client" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("socket.io-client");

/***/ }),

/***/ "utils":
/*!************************!*\
  !*** external "utils" ***!
  \************************/
/***/ ((module) => {

module.exports = require("utils");

/***/ }),

/***/ "webtopics":
/*!****************************!*\
  !*** external "webtopics" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("webtopics");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;