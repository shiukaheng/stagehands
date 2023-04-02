import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { StageScene } from './StageScene'
import { createContext, useCallback, useContext, useRef } from 'react';
import { TopicContext } from '../../contexts/ServerContext';

export type cursorOverride = 'default' | 'pointer' | 'grab' | 'grabbing';
export interface IStageContext {
  setCursor: (cursor: cursorOverride) => void;
}
export const StageContext = createContext<IStageContext>({
  setCursor: () => {}
});

export function Stage() {
  const provider = useContext(TopicContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const setCursor = useCallback((cursor: cursorOverride) => {
    if (canvasRef.current && cursor !== null) {
      canvasRef.current.style.cursor = cursor;
    }
  }, [canvasRef]);
  return (
    <div className="flex-grow m-5 ui-shadow ui-div ui-highlight safari-canvas-overflow-fix">
      <Canvas
        ref={canvasRef}
        shadows        
        camera={{
          position: [0, 10, 28],
          fov: 90
        }}>
        <StageContext.Provider value={{ setCursor }}>
        <color attach="background" args={['#222']} />
        <OrbitControls
          minDistance={1}
          maxDistance={9}
        />
        <spotLight position={[5, 5, 5]} penumbra={1} intensity={0.1}/>
        <spotLight position={[-5, 5, 5]} penumbra={1} intensity={0.1}/>
        <spotLight position={[5, 5, -5]} penumbra={1} intensity={0.1}/>
        <StageScene />
        </StageContext.Provider>
      </Canvas>
    </div>
  );
}
