import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { createContext, useCallback, useRef } from 'react';
import { StageScene } from './Stage/StageScene';
import { AiFillPlayCircle, AiOutlineArrowLeft } from 'react-icons/ai';

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
      <div className="relative h-20 w-full">
        <button
            id={"backButton"}
            className="left-0 top-0 ui-shadow ui-highlight ui-div font-bold box-border h-16 w-20 rounded m-2 px-8" // Could change colour here depending on connection status
            onClick={() => {console.log("Connection button clicked")}}> {/* onClick to connect? */}
                <AiOutlineArrowLeft size={20} />⬅←
            </button>
          </div>
          <div className="relative h-40 w-28">
            <div className="inset-x-0 top-0">
            test
            </div>
            </div>
          
        <div className="flex h-full overflow-hidden flex-row">
        {/* side panel start */}
        <div id="SidePanel" className="min-w-[300px] m-5 overflow-clip ui-div ui-shadow ui-highlight flex flex-col">
        <div id="MiddleSection" className=" border-solid h-full snap-center overflow-y-auto overflow-x-hidden">
        <div className="text-lg font-bold mb-4 ui-div ui-shadow ui-highlight-extra mx-6 p-2 m-5">
            Available Bots
            </div>
            <button
            id={"nameOfBot"}
            className="ui-shadow ui-highlight ui-div font-bold box-border h-20 w-64 rounded m-2 px-8" // Could change colour here depending on connection status
            onClick={() => {console.log("Connection button clicked")}}> {/* onClick to connect? */}
                Alice
            </button>
            </div>
        </div>
        {/* side panel end */}
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
      
        </div>
        <div className="m-5 h-28 ui-shadow ui-div ui-highlight p-2 font-bold">Name</div>
        </div>
        {/* canvas end */}
        
        </div></div>
    )
}