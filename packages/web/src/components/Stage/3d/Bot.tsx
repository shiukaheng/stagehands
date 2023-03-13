import { Fragment, useContext, useState } from 'react';
import { BotState } from 'schema';
import {Billboard, Text} from '@react-three/drei';
import { LED } from './LED';
import { StageContext } from '../Stage';

function Bot({module}: {module: BotState}) {
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    const {setCursor} = useContext(StageContext);

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
                position={module.pose.position as [number, number, number]}
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
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={hovered ? 'black' : 'darkgray'}/>
                <LED ledState={module.ledState.base} position={[0, 0.7, 0]} intensity={5} distance={5} castShadow/>
            </mesh>
        </Fragment>
    );
}

export default Bot;