import { ModuleType, Pose } from "schema";

type FrameID = string;

// Two approaches:
// 1: Automated recall: Poses have current and target, and saving presets will be as simple as creating a new pose based on the current pose
//    Pros: Simple to use, no need to write custom logic for each module
//    Cons: Complex to implement (need to figure out how to handle constraints), and may not be as flexible as we want
// 2: Manual recall: Poses only have current, but there is also a state that can be recalled. To save current state as a preset, we have to write custom logic for each module to translate the current state into a pose
//    Pros: Simple to implement, flexible
//    Cons: Not as simple to use, need to write custom logic for each module

type RecallablePose = {
    current: Pose;
    target: Pose;
    constraint: LinearConstraint | AngularConstraint | PlanarConstraint | null;
}

/**
 * New draft of the bot state that decouples the bot state from the 3D rendering logic
 * The idea is:
 * 1. 
 */
type NeoBotState = {
    name: string; // Display name of the bot
    activeFrames: Map<FrameID, RecallablePose>; // Arbritrary 3D frames that can be viewed and recalled
    frames: Map<FrameID, Pose>; // Arbritrary 3D frames that can be viewed but not recalled    
    state: { // Any non-positional state that the bot has
        [key: string]: any;
    }
    module: ModuleType;
    moduleState: {
        [key: string]: any;
    }
}

export interface IComponentProps {
    id: string;
    currentPose: Pose;
    targetPose: Pose;
    set
    botState: NeoBotState;
    setBotState: (botState: NeoBotState) => void;
} // Allows for arbritrary components to be rendered, and also allows for the component to access the bot state for state specific rendering (like LED color)

function GenericComponent({id, pose}: IComponentProps) {
    return null;
}

/**
 * Maps a botState to a bunch of actual 3D components
 */
function ComponentMapper({botState}: {botState: NeoBotState}) {
    // Copy in root pose to poses with ID "root"
    // Then, we match the pose ID to the 3D component
}

export default function BotNeo({botState, setBotState}: {botState: NeoBotState, setBotState: (botState: NeoBotState) => void}) {
    return null;
}