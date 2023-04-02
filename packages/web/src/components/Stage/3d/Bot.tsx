import { Fragment, useCallback, useContext, useState } from 'react';
import { BotState, FleetState, getRecallFleetState } from 'schema';
import {Billboard, Text} from '@react-three/drei';
import { LED } from './LED';
import { StageContext } from '../Stage';
import Module from './Module';

import componentSelectContext from '../../../contexts/ComponentSwitchContext';
import { ServiceContext } from '../../../contexts/ServerContext';
import _ from 'lodash';

const height = 0.15;
const stickHeight = 0.695;

function Bot({bot, botID, fleet}: {bot: BotState, botID: string, fleet: {[key: string]: BotState}}) {
    // const [hovered, hover] = useState(false);
    // const [clicked, click] = useState(false);
    const selectContext = useContext(StageContext);
    const { componentSelect, setComponentSelect } = useContext(componentSelectContext);
    // const services = useContext(ServiceContext);
    // const fleetUpdate = useCallback(
    //     _.debounce((newFleet: FleetState) => {
    //       // console.log(newFleet)
    //       services?.recallFleetState.callback(getRecallFleetState(newFleet))
    
    //     }, 100, { "leading": false, "trailing": true, 'maxWait': 100 })
    //     , [services?.recallFleetState])
    // console.log("hi from live")


    const bodyPose = [bot.pose.position[0], bot.pose.position[1] + height / 2 + 0.01, bot.pose.position[2]] as [number, number, number];
    return (
        <Fragment key={bot.name}>
            {/* Label */}
            <group position={bot.pose.position as [number, number, number]}>
                <Billboard position={[0,1.5,0]}>
                    <Text color="white" fontSize={0.5} position={[0, 0, 0]}>
                        {bot.name}
                    </Text>
                </Billboard>
            </group>
            {/* Main model */}
            <mesh
                castShadow
                receiveShadow
                position={bodyPose}
                scale={1}
                rotation = {[0,bot.pose.quaternion[0],0]}
                onClick={(event) => {
                    setComponentSelect({
                        type: "live_attributes_page",
                        botID: botID
                })
                }}
                // onPointerMove={(event) => {
                //         console.log(event)
                //         fleet[botID].targetPose.position = [event.point.x, 0, event.point.z]
                //         fleetUpdate(fleet)

                    
                // }}

                // onDoubleClick={(event) => {
                //     selectContext.setContext( {selected : true, botID: botID})
                //     console.log("hi")
                    
                // }}
                >
                <boxGeometry args={[0.26, height, 0.26]} />
                {/* Black matte plastic */}
                <meshPhysicalMaterial color="gray" roughness={0.5} metalness={0.5} />
                <LED ledState={bot.ledState.base} position={[0,0.005,0]} intensity={5} distance={5} castShadow/>
                <mesh position={[0.135,0-height/2+0.0325-0.01,0.075]} rotation={[0,0,Math.PI/2]}>
                    {/* Rubber wheels, less shiny */}
                    <cylinderGeometry args={[0.0325, 0.0325, 0.017, 32]} />
                    <meshPhysicalMaterial color="black" roughness={0.7} metalness={0.5} />
                </mesh>
                <mesh position={[-0.135,0-height/2+0.0325-0.01,0.075]} rotation={[0,0,Math.PI/2]}>
                    {/* Rubber wheels, less shiny */}
                    <cylinderGeometry args={[0.0325, 0.0325, 0.017, 32]} />
                    <meshPhysicalMaterial color="black" roughness={0.7} metalness={0.5} />
                </mesh>
                <mesh position={[0,0.3475,0]}>
                    <boxGeometry args={[0.04,0.695,0.04]}/>
                    {/* Brushed metal */}
                    <meshPhysicalMaterial color="silver" roughness={0.2} metalness={0.9} />
                </mesh>
                <Module bot={bot} stickHeight={stickHeight} />
                
            </mesh>
        </Fragment>
    );
}

export default Bot;