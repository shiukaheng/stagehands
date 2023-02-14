import { useState } from "react"
import generateMicPanelButton from "./GenerateMicPanelButton"


function MicPanel () {
    const [buttons, setButtons] = useState([] as any[])

    return (
        <div>
            <div id="MiddleSection" className="absolute overflow-y-auto overflow-x-hidden border-solid w-72 h-5/6 snap-center">
                {buttons} {/* The list of mics */}
            </div>
            {/* The button that adds a new mic to the list */}
            <div id="BottomSection" className="absolute inset-x-0 bottom-0 m-5">
                <button
                    id="addButton"
                    className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-64 rounded m-2"
                    onClick={() => setButtons(generateMicPanelButton(buttons))}>
                    +</button>
            </div>
        </div>
    )
}

export default MicPanel