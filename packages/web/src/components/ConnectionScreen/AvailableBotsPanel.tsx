function AvailableBotsPanel() {
    return (
        <div id="AvailableBotsPanel" className="min-w-[300px] m-5 overflow-clip ui-div ui-shadow ui-highlight flex flex-col">
            <div id="MiddleSection" className=" border-solid h-full snap-center overflow-y-auto overflow-x-hidden">
                <div className="text-lg font-bold mb-4 ui-div ui-shadow ui-highlight-extra mx-6 p-2 m-5">
                    Available Bots
                </div>
                <button
                    id={"nameOfBot"}
                    className="ui-shadow ui-highlight ui-div font-bold box-border h-20 w-64 rounded m-2 px-8" // Could change colour here depending on connection status
                    onClick={() => { console.log("Connection button clicked") }}> {/* onClick to connect? */}
                    Alice
                </button>
            </div>
        </div>
    )
}

export default AvailableBotsPanel;