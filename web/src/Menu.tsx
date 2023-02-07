import { React } from 'react';

/**
 * Menu compinent for the app
 *
 * @returns {JSX.Element} Menu component
 */
export function Menu() {
  return (
    <div className="w-full drop-shadow bg-stone-700 flex sticky top-0 z-50 rounded-b-2xl" style={{ height: "10vh" }}>
        <h1 className="text-4xl text-white m-auto relative">StageHand</h1>
        <a className="text-2xl text-white m-auto relative right-0 pr-1">+</a>
    </div>
  );
}
