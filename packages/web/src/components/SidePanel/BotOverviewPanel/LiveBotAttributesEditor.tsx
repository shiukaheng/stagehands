import _ from "lodash";
import { useCallback, useRef, useContext, useState } from "react"
import { BotState, FleetState, getRecallFleetState, RecallFleetState } from 'schema';
import { TopicContext, ServiceContext } from "../../../contexts/ServerContext";

/**
 * Component for displaying and editing the live attributes of a bot
 */
export default function LiveBotAttributesEditor({bot, botID} : {bot: BotState, botID: string}) {
 const xValInputElemRef = useRef<HTMLInputElement>(null)
 const xValRangeElemRef = useRef<HTMLInputElement>(null)
 const yValInputElemRef = useRef<HTMLInputElement>(null)
 const yValRangeElemRef = useRef<HTMLInputElement>(null)
 const angleinputElemRef = useRef<HTMLInputElement>(null)
 const angleRangeElemRef = useRef<HTMLInputElement>(null)
 const nameInputElemRef = useRef<HTMLInputElement>(null)
 const ledColorElemRef = useRef<HTMLInputElement>(null)

 const services = useContext(ServiceContext);
 const provider = useContext(TopicContext);
 if (provider === null) {
   throw new Error("Provider not found")
 }
 const fleet = provider.fleet

 const fleetUpdate =  useCallback(
  _.debounce((newFleet: FleetState)=> {
    console.log("Updating fleet")
    // console.log(newFleet)
    services?.recallFleetState.callback(getRecallFleetState(newFleet))

  },100,{"leading" : false, "trailing" : true, 'maxWait' : 100}) 
, [services?.recallFleetState])
 return (
     fleet !== undefined? (
   <div className="h-full overflow-clip ">
     <div className="h-full w-full p-2 overflow-y-auto">

     <table 
       id="attributes"
       className=" font-bold h-full w-full rounded p-5 bottom-0 overflow-y-auto overflow-x-hidden">
       
       <tbody>
       <tr>
         <th>Name</th>
         <td>
           <input
             type="text"
             id="micName"
             ref = {nameInputElemRef}
             className="text-center"
             defaultValue={bot.name}
             size={11}
             onChange = {()=>{
              fleet[botID].name = nameInputElemRef.current!.value
              fleetUpdate(fleet)
              }} ></input>
         </td>
       </tr>

       <tr>
         <th>Status</th>
         <td>
           <button
             className="text-center mb-2 h-6 w-32 "
             id="micStatus">
               {bot.status} 
           </button>
         </td>
       </tr>

       <tr>
         <th>Module</th>
         <td>
           <button
             className="text-center mb-2 h-6 w-32 "
             id="micModule">
              
               {bot.module.type}
           </button>
         </td>
       </tr>
   
       <tr>
         <th>X</th>
         <td>
           <input 
             ref={xValInputElemRef}
             type={"number"}
             id={"micX"}
             min={0}
             max={100}
             
             defaultValue={bot.pose.position.at(0)}
             onChange = {() => {
               xValRangeElemRef.current!.value = xValInputElemRef.current!.value
               fleet[botID].targetPose.position[0] = parseInt(xValInputElemRef.current!.value)

               fleetUpdate(fleet)
             }}
             
             ></input>
         </td>
       </tr>
     
       <tr>
         <th> </th>
         <td>
           <input 
             ref = {xValRangeElemRef}
             type = {"range"}
             id = {"micXRange"}
             min = {0}
             max = {100}
             defaultValue = {bot.pose.position.at(0)}
             step = {1}
             onChange = {() => {
               // When the range input is changed, useRef to get the input element
               // and set the value of the input element to the value of the range input
               xValInputElemRef.current!.value = xValRangeElemRef.current!.value
               fleet[botID].targetPose.position[0] = parseInt(xValRangeElemRef.current!.value)

               fleetUpdate(fleet)
             }}
           ></input>
         </td>
       </tr>
       
       <tr>

         <th>Y</th>
         <td>
           <input
             ref = {yValInputElemRef}
             type={"number"}
             id={"micY"}
             min={0}
             max={100}
             defaultValue={bot.pose.position.at(1)}
             onChange = {() => {
               yValRangeElemRef.current!.value = yValInputElemRef.current!.value
               fleet[botID].targetPose.position[2] = parseInt(yValInputElemRef.current!.value)

               fleetUpdate(fleet)
             }}
             
             
             ></input>
         </td>
       </tr>
       
       <tr>
         <th> </th>
         <td>
           <input 
             ref = {yValRangeElemRef}
             type = {"range"}
             id = {"micXRange"}
             min = {0}
             max = {100}
             defaultValue = {bot.pose.position.at(1)}
             step = {1}

             onChange = {() => {
               yValInputElemRef.current!.value = yValRangeElemRef.current!.value
               fleet[botID].targetPose.position[2] = parseInt(yValRangeElemRef.current!.value)

               fleetUpdate(fleet)
             }}
             // onChange = {() => {
             //   document.getElementById("micX").innerText = document.getElementById("micXRange")
             // }}
           ></input>
         </td>
       </tr>
     
       <tr>
         <th>Angle</th>
         <td>
         <input 
             ref = {angleinputElemRef}
             type = {"number"}
             id = {"AngleInput"}
             min = {0}
             max = {180}
             defaultValue = {0}
             step = {1}
             onChange = {() => {
               // When the range input is changed, useRef to get the input element
               // and set the value of the input element to the value of the range input
               angleRangeElemRef.current!.value = angleinputElemRef.current!.value
             }}
           ></input>
         </td>
       </tr>
      
       <tr>
         <th> </th>
         <td>
           <input 
             ref = {angleRangeElemRef}
             type = {"range"}
             id = {"AngleRange"}
             min = {0}
             max = {180}
             defaultValue = {0}
             step = {1}

             onChange = {() => {
               angleinputElemRef.current!.value = angleRangeElemRef.current!.value
             }}
           ></input>
         </td>
       </tr>
     
       <tr >
         <th>Battery</th>
         <td>
           <button className="text-center h-6 w-32">
               30%
           </button>
         </td>
       </tr>

       <tr>
         <th>LED </th>
         <td>
           <input 
           type = "color"
           defaultValue={rgbToHex(fleet[botID].ledState.base.rgbValue)}
           id = "ledColor"
           ref = {ledColorElemRef}
           size = {15}
           
           onChange={()=>{
            const hex = ledColorElemRef.current!.value
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            fleet[botID].ledState.base.rgbValue = [r,g,b]
            fleetUpdate(fleet)
           }}>
           </input>
         </td>
       </tr>

       </tbody>

     </table>
     </div>
   </div> 
     ) : null
 )
}
function rgbToHex([r, g, b]: number[]) {
  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;}
  return ("#" + componentToHex(r) + componentToHex(g) + componentToHex(b));
}
