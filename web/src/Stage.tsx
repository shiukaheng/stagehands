import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Plane } from '@react-three/drei'
import { StageScene } from './StageScene'

export function Stage() {
  return (
    <div className="absolute inset-y-10 right-50">
      <Canvas className="h-full">
        <OrbitControls />
        <StageScene />
      </Canvas>
    </div>
  );
}
