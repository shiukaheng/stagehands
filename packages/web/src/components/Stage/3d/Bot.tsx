import { Fragment, useCallback, useContext, useState } from 'react';
import { BotState, FleetState, getRecallFleetState } from 'schema';
import {Billboard, Text} from '@react-three/drei';
import { LED } from './LED';
import { StageContext } from '../Stage';

import componentSelectContext from '../../../contexts/ComponentSwitchContext';

const height = 0.15;
const stickHeight = 0.695;
function Module3d({bot}:{bot : BotState}){
    if(bot.module.type === "micStand"){
        const micHeight = 0.135 +(stickHeight-0.2) * bot.module.state?.gripPosition!/100
        const radian = bot.module.state?.gripAngle!/180 * Math.PI
        return(
            <mesh position = {[0,micHeight,0]}>
                <boxGeometry args={[0.1, 0.1, 0.15]} />
                <meshPhysicalMaterial color="black" roughness={0.7} metalness={0.5} />
                
                <mesh position = {[0.1,0,0]} rotation = {[radian,Math.PI/2,Math.PI/2]}>
                    <boxGeometry args={[0.1, 0.05, 0.05] } />
                </mesh>
            </mesh>

        )
    }else{
        return null;
    }
}
function Bot({bot, botID, fleet}: {bot: BotState, botID: string, fleet: {[key: string]: BotState}}) {
    // const [hovered, hover] = useState(false);
    // const [clicked, click] = useState(false);
    const selectContext = useContext(StageContext);
    const { componentSelect, setComponentSelect } = useContext(componentSelectContext);
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
                onClick={(event) => {
                    setComponentSelect({
                        type: "live_attributes_page",
                        botID: botID
                })
                }}
                // onPointerMove={(event) => {
                //     if(selectContext.context === true){
                //         console.log(event)
                //         fleet[botID].targetPose.position = [event.point.x, 0, event.point.z]
                //         fleetUpdate(fleet)

                //     }
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
                <Module3d bot={bot} />
                
            </mesh>
        </Fragment>
    );
}

export default Bot;