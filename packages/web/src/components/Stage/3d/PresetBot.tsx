import { Fragment, useContext, useState } from 'react';
import { BotState, RecallBotState } from 'schema';
import {Billboard, Text} from '@react-three/drei';
import { LED } from './LED';
import { StageContext } from '../Stage';
import componentSelectContext from '../../../contexts/ComponentSwitchContext';
import Module from './Module';

const height = 0.15;
const stickHeight = 0.695;

function PresetBot({bot: bot, botID, presetID}: {bot: RecallBotState, botID: string, presetID: string}) {
    const bodyPose = [bot.targetPose.position[0], bot.targetPose.position[1] + height / 2 + 0.01, bot.targetPose.position[2]] as [number, number, number];
    const { componentSelect, setComponentSelect } = useContext(componentSelectContext);
    return (
        <Fragment key={bot.name}>
            {/* Label */}
            <group position={bot.targetPose.position as [number, number, number]}>
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
                rotation={[0, bot.targetPose.quaternion[0], 0]}
                onClick={(event) => {
                    setComponentSelect({
                        type: "preset_mic_attributes_page",
	                    botID: botID,
                        presetID: presetID
                })
                }}>

                <boxGeometry args={[0.26, height, 0.26]} />
                {/* Black matte plastic */}
                <meshPhysicalMaterial color="gray" roughness={0.5} metalness={0.5} />
                <LED ledState={bot.baseLEDState} position={[0,0.005,0]} intensity={5} distance={5} castShadow/>
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

export default PresetBot;