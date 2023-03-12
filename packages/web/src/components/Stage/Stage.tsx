import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { StageScene } from './StageScene'

export function Stage() {
  return (
    <div className="flex-grow m-8 ui-shadow ui-div ui-highlight safari-canvas-overflow-fix">
      <Canvas camera={{
        position: [0, 10, 28],
        fov: 50
      }
      }>
        <color attach="background" args={['#222']} />
        <OrbitControls
        minDistance={3}
        maxDistance={30}
        />
        <StageScene />
      </Canvas>
    </div>
  );
}
