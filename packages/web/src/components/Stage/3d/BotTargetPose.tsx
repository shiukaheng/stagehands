import { Fragment, useContext, useState } from 'react';
import { BotState } from 'schema';
import {Billboard, Text} from '@react-three/drei';
import { LED } from './LED';
import { StageContext } from '../Stage';
import { Vector3 } from 'three/src/math/Vector3';
import THREE from 'three';

const height = 0.15;

function Bot({module}: {module: BotState}) {
    const TargetBodyPose = [module.targetPose.position[0], module.targetPose.position[1] + height / 2 + 0.01, module.targetPose.position[2]] as [number, number, number];
    const arrived = module.status === "idle"
    const bodyPose = [module.pose.position[0], module.pose.position[1] + height / 2 + 0.01, module.pose.position[2]] as [number, number, number];
    const posDiff = [TargetBodyPose[0]-bodyPose[0],TargetBodyPose[1]-bodyPose[1],TargetBodyPose[2]-bodyPose [2]]
    const posDiffMag = Math.sqrt(posDiff[0] ** 2 + posDiff[1] ** 2 + posDiff[2] ** 2);
    // console.log("hi from taget")
    
    return (
        arrived? null:(
        <Fragment key={module.name}>
            {/* Label */}
            <group position={module.targetPose.position as [number, number, number]}>
                <Billboard position={[0,1.5,0]}>
                    <Text color="black" fontSize={0.5} position={[0, 0, 0]}>
                        {"target: "+ module.name}
                    </Text>
                </Billboard>
            </group>
            <arrowHelper args={[new Vector3(posDiff[0],posDiff[1],posDiff[2]),new Vector3(bodyPose[0], bodyPose[1],bodyPose[2]) , Math.log(posDiffMag+1), 0x000000, 0.2, 0.1]} />
            {/* Main model */}
            <mesh
                castShadow
                receiveShadow
                position={TargetBodyPose}
                scale={1}>
                <boxGeometry args={[0.26, height, 0.26]} />
                {/* Black matte plastic */}
                <meshPhysicalMaterial color="gray" roughness={0.5} metalness={0.5} opacity={0.2} transparent = {true} />
                <mesh position={[0.135,0-height/2+0.0325-0.01,0.075]} rotation={[0,0,Math.PI/2]}>
                    {/* Rubber wheels, less shiny */}
                    <cylinderGeometry args={[0.0325, 0.0325, 0.017, 32]} />
                    <meshPhysicalMaterial color="black" roughness={0.7} metalness={0.5} opacity = {0.2} transparent = {true} />
                </mesh>
                <mesh position={[-0.135,0-height/2+0.0325-0.01,0.075]} rotation={[0,0,Math.PI/2]}>
                    {/* Rubber wheels, less shiny */}
                    <cylinderGeometry args={[0.0325, 0.0325, 0.017, 32]} />
                    <meshPhysicalMaterial color="black" roughness={0.7} metalness={0.5} opacity = {0.2} transparent = {true}/>
                </mesh>
                <mesh position={[0,0.3475,0]}>
                    <boxGeometry args={[0.04,0.695,0.04]}/>
                    {/* Brushed metal */}
                    <meshPhysicalMaterial color="silver" roughness={0.2} metalness={0.9} opacity = {0.2} transparent = {true}/>
                </mesh>

            </mesh>
        </Fragment>
        )
    );
}

export default Bot;