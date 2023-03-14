import { Fragment, useContext, useState } from 'react';
import { BotState } from 'schema';
import {Billboard, Text} from '@react-three/drei';
import { LED } from './LED';
import { StageContext } from '../Stage';

const height = 0.15;

function Bot({module}: {module: BotState}) {
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    const {setCursor} = useContext(StageContext);
    const bodyPose = [module.pose.position[0], module.pose.position[1] + height / 2 + 0.01, module.pose.position[2]] as [number, number, number];
    return (
        <Fragment key={module.name}>
            {/* Label */}
            <group position={module.pose.position as [number, number, number]}>
                <Billboard position={[0,1.5,0]}>
                    <Text color="white" fontSize={0.5} position={[0, 0, 0]}>
                        {module.name}
                    </Text>
                </Billboard>
            </group>
            {/* Main model */}
            <mesh
                castShadow
                receiveShadow
                position={bodyPose}
                scale={clicked ? 1.5 : 1}
                onClick={(event) => click(clicked)}
                onPointerOver={(event) => {
                    hover(true);
                    setCursor('grab');
                }}
                onPointerOut={(event) => {
                    hover(false)
                    setCursor('default');
                }}>
                <boxGeometry args={[0.26, height, 0.26]} />
                {/* Black matte plastic */}
                <meshPhysicalMaterial color="gray" roughness={0.5} metalness={0.5} />
                <LED ledState={module.ledState.base} position={[0,0.005,0]} intensity={5} distance={5} castShadow/>
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
            </mesh>
        </Fragment>
    );
}

export default Bot;