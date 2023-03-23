import { FaArrowLeft } from "react-icons/fa";

function BackButton() {
    return(
    <button
            id={"backButton"}
            className="left-0 top-0 ui-shadow ui-highlight ui-div font-bold box-border h-16 w-20 rounded my-2 mx-5 px-7" // Could change colour here depending on connection status
            onClick={() => {console.log("Connection button clicked")}}> {/* onClick to connect? */}
                <FaArrowLeft size={25} />
            </button>
            )
}

export default BackButton;