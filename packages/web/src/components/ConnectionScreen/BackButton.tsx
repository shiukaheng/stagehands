import { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import screenSelectionContext, { ScreenSelection } from "web/src/contexts/WhichScreenContext";

function BackButton() {
    const { screenSelection, setScreenSelection } = useContext(screenSelectionContext);
    return (
        <button
            id={"backButton"}
            className="left-0 top-0 ui-shadow ui-highlight ui-div font-bold box-border h-16 w-20 rounded my-2 mx-5 px-7" // Could change colour here depending on connection status
            onClick={() => { setScreenSelection(("main_screen" as ScreenSelection))
            console.log("back button clicked")}}> {/* onClick to connect? */}
            <FaArrowLeft size={25} />
        </button>
    )
}

export default BackButton;