import { Plane, Html } from '@react-three/drei';
import { Fragment, useState } from 'react';


class MicStand {
  id: string;
  x: number;
  y: number;
  hovered: boolean;
  hover: (hovered: boolean) => void;
  clicked: boolean;
  click: (clicked: boolean) => void;

  constructor(id: string, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    [this.hovered, this.hover] = useState(false);
    [this.clicked, this.click] = useState(false);
  }

  render() {
    return (
        <Fragment key={this.id}>
        <mesh
        position={[this.x, this.y, 0.5]}
        scale={this.clicked ? 1.5 : 1}
        onClick={(event) => this.click(!this.clicked)}
        onPointerOver={(event) => this.hover(true)}
        onPointerOut={(event) => this.hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={this.hovered ? 'black' : 'darkgray'} />
        </mesh>
        </Fragment>);
  }
}

/**
 * StageScene
 *
 * @return Fragment with the lighting and plane for the stage
 */
export function StageScene() {
  const micStands = [ new MicStand('Mic 1', 2, 4), new MicStand('Mic 2', 5, 7) ];

  // render the mic stands on the plane
  return (
    <Fragment>
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <Plane args={[20, 20]} />
        <meshStandardMaterial attach="material" color="red"/>
        {
          micStands.map((micStand) => micStand.render())
        }
      </mesh> 
    </Fragment>
  )
}
