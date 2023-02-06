import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Plane } from '@react-three/drei'
import { StageScene } from './StageScene'

export function Stage() {
  return (
    <div className="absolute h-full">
      <Canvas className="h-full">
        <OrbitControls />
        <StageScene />
      </Canvas>
    </div>
  );
}
