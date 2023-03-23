import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { createContext, useCallback, useRef } from 'react';
import { StageScene } from '../Stage/StageScene';
import { AiFillPlayCircle, AiOutlineArrowLeft } from 'react-icons/ai';
import {FaArrowLeft} from 'react-icons/fa';
import BackButton from './BackButton';
import AvailableBotsPanel from './AvailableBotsPanel';

export type cursorOverride = 'default' | 'pointer' | 'grab' | 'grabbing';
export interface IPreviewContext {
  setCursor: (cursor: cursorOverride) => void;
}
export const PreviewContext = createContext<IPreviewContext>({
  setCursor: () => {}
});

export function ConnectionScreen() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  const setCursor = useCallback((cursor: cursorOverride) => {
    if (canvasRef.current && cursor !== null) {
      canvasRef.current.style.cursor = cursor;
    }
  }, [canvasRef]);
    return (
      <div>
      <div className="flex relative h-20 w-4/5 flex-row">
        <BackButton />
            <div className="absolute top-1/4 left-1/2 text-center font-bold text-4xl">Connect Bots</div> {/* title of page */}
          </div>
        <div className="flex overflow-hidden flex-row">
        <AvailableBotsPanel />
        <div className="w-full flex-col overflow-visible"> {/* div for canvas and below details */}
          {/* canvas start */}
        <div className="m-5 h-4/5 ui-shadow ui-div ui-highlight safari-canvas-overflow-fix">
        <Canvas
        ref={canvasRef}
        shadows
        camera={{
          position: [0, 10, 28],
          fov: 50
        }
        }>
        <PreviewContext.Provider value={{ setCursor }}>
        <color attach="background" args={['#222']} />
        <OrbitControls
          minDistance={1}
          maxDistance={7}
        />
        <spotLight position={[5, 5, 5]} penumbra={1} intensity={0.1}/>
        <spotLight position={[-5, 5, 5]} penumbra={1} intensity={0.1}/>
        <spotLight position={[5, 5, -5]} penumbra={1} intensity={0.1}/>
        <StageScene />
        </PreviewContext.Provider>
      </Canvas>
      {/* canvas end */}
      {/* below canvas details start */}
        </div>
        <div className="m-5 h-28 ui-shadow ui-div ui-highlight p-2 font-bold">Name</div> {/* selected bot info goes here */}
        </div>
      {/* below canvas details end */}
        
        </div></div>
    )
}