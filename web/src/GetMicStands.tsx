import MicStand from './MicStand';

export default function GetMicStands() {
  return ([ new MicStand('Mic 1', 2, 4), new MicStand('Mic 2', 5, 7), new MicStand('Mic 3', 6, 8), new MicStand('Mic 4', 7, 9) ]);
}
