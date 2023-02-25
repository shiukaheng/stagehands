import { Fragment, useContext, useState } from 'react'
import componentSelectContext from './ComponentSwitchContext';
import MicAttributesPage from './MicAttributesPage';

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
        position={[this.x, 0.5, this.y]}
        scale={this.clicked ? 1.5 : 1}
        onClick={(event) => this.click(!this.clicked)}
        onPointerOver={(event) => this.hover(true)}
        onPointerOut={(event) => this.hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={this.hovered ? 'black' : 'darkgray'} />
        </mesh>
        </Fragment>);
  }

  button() {
    const {componentSelect, setComponentSelect} = useContext(componentSelectContext);
    return (
    
    <button
      id={this.id}
      className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-32 w-64 rounded m-2"
      onClick={() => setComponentSelect(2)}>
        <div className="text-left indent-[10.5%]">
      Name: {this.id}
      </div>
      <div className="text-left indent-5">
      Status: <button id="micStatus" className="bg-green-500 text-green-500 font-bold rounded-none border-none h-6 w-32 m-2">.</button>
      </div>
      <div className="text-left indent-[5%]">
      {'Module: \xa0 Microphone'}
      </div>
      {/* onClick = {<MicAttributesPage/>} */}
    </button>
    );
  }
}

export default MicStand
