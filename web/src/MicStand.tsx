import { Fragment, useState } from 'react'

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

export default MicStand
