import { React } from 'react';
import { Canvas } from 'react-three-fiber';

/**
 * MicStand class
 */
export class MicStand {
  int x;
  int y;
  int z;

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  export function render() {
    return (
      <mesh>
        <boxBufferGeometry attach="geometry" args={[this.x, this.y, this.z]} />
      </mesh>
    );
  }
}
