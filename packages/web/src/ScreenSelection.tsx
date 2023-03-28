import { Stage } from "@react-three/drei";
import { Fragment, useContext } from "react";
import { ConnectionScreen } from "./components/ConnectionScreen/ConnectionScreen";
import MenuBar from "./components/MenuBar";
import SidePanel from "./components/SidePanel/SidePanel";
import screenSelectionContext from "./contexts/WhichScreenContext";

export function ScreenSelection() {
    const { screenSelection } = useContext(screenSelectionContext);
    if (screenSelection === "main_screen") { {/* display main screen */ }
        return (
            <Fragment>
                <div className='ui-div ui-shadow flex flex-col h-full'>
                    <MenuBar />
                    <div className="flex h-full overflow-hidden flex-row">
                        <SidePanel /> {/* Side panel that displays either preset or bot panel */}
                        {/*<Stage /> {/* Stage that displays the 3D scene */}
                    </div>
                </div>
            </Fragment>
        )
    } else if (screenSelection === "connection_screen") { {/* display connection screen */ }
        return (<Fragment><ConnectionScreen /></Fragment>)
    }
    else {
        return null
    }
}

  // export default ScreenSelection