function generateSidePanelButton(buttons: any[]) {
    return buttons.concat(
      <button
        id={("aButton" + buttons.length.toString())}
        className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-32 w-64 rounded m-2">
        Name: <input
          type="text"
          id="micName"
          defaultValue={("Mic " + buttons.length.toString())}
          size={11}></input>
        <br></br>
        Status: <button id="micStatus" className="bg-green-500 text-green-500 font-bold rounded-none border-none h-6 w-32 m-2">.</button>
        <br></br>
        Module: <select id="micModule" className="w-32">
          <option value="1">Module 1</option>
          <option value="2">Module 2</option>
          <option value="3">Module 3</option>
        </select>
      </button>)
  }

  export default generateSidePanelButton