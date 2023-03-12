import { Fragment, useState } from 'react';
import { BotState } from 'schema';

function Module3DComponent({module}: {module: BotState}) {
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);

    return (
        <Fragment key={module.name}>
            <mesh
                position={module.pose.position as [number, number, number]}
                scale={clicked ? 1.5 : 1}
                onClick={(event) => click(clicked)}
                onPointerOver={(event) => hover(true)}
                onPointerOut={(event) => hover(false)}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={hovered ? 'black' : 'darkgray'} />
            </mesh>
        </Fragment>
    );
}

export default Module3DComponent;