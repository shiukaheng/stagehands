import { useRef } from "react"
import { BotState } from 'schema';

/**
 * Component for displaying and editing the live attributes of a bot
 */
export default function LiveBotAttributesEditor({bot} : {bot: BotState}) {
 const xValInputElemRef = useRef<HTMLInputElement>(null)
 const xValRangeElemRef = useRef<HTMLInputElement>(null)
 const yValInputElemRef = useRef<HTMLInputElement>(null)
 const yValRangeElemRef = useRef<HTMLInputElement>(null)
 const angleinputElemRef = useRef<HTMLInputElement>(null)
 const angleRangeElemRef = useRef<HTMLInputElement>(null)
 return (
     
   <div className="h-full overflow-clip ">
     <div className="h-full w-full p-2">

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
             className="text-center"
             defaultValue={bot.name}
             size={11}></input>
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
     
       <tr>
         <th>Battery</th>
         <td>
           <button className="text-center h-6 w-32">
               30%
           </button>
         </td>
       </tr>
       </tbody>

     </table>
     </div>
   </div> 
   
 )
}