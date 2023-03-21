import _ from "lodash";
import { useCallback, useRef, useContext, useState } from "react"
import { BotState, FleetState, getRecallFleetState, RecallFleetState } from 'schema';
import { rgbToHex } from "../../../utils/rgbToHex";
import { TopicContext, ServiceContext } from "../../../contexts/ServerContext";
import { hexTorgb } from "../../../utils/hexTorgb";

/**
 * Component for displaying and editing the live attributes of a bot
 */

// const uiDescription =[
//     {
//         title: "Name",
//         value: "defaultValue" || 123,
//         type: "string",
//         readOnly: true,
//         setter : any
//     }
// ]
// <table>
// {
//     uiDescription.map((content) => {
//         if (content.type === "string") {
//             return <ReadOnlyAttribute title = {content.title} value = {content.value}/>}
//         else if (content.type === "number") {
//             return <NumberAndBarInput value ={content.value} setValue = {()=>{
//                 fleetUpdate()
//             }} boundary = {[-100, 100]} title = {content.title}/>
// }
// </table>

export default function LiveBotAttributesEditor({ bot, botID }: { bot: BotState, botID: string }) {
    const [x , setX] = useState(bot.pose.position.at(0)!)
    const [y , setY] = useState(bot.pose.position.at(1)!)
    const [angle , setAngle] = useState(0)
    const [ledColor , setLedColor] = useState(bot.ledState.base.rgbValue.map((x)=>x*255))
    const [ledAnimation , setLedAnimation] = useState(bot.ledState.base.ledAnimation)
   return(
    <div className="h-full overflow-clip ">
    <div className="h-full w-full p-2 overflow-y-auto">

        <table
            id="attributes"
            className=" font-bold h-full w-full rounded p-5 bottom-0 overflow-y-auto overflow-x-hidden">
                {<ReadOnlyAttribute title = "Name" value = {bot.name}/>}
                {<ReadOnlyAttribute title = "Status" value = {bot.status}/>}
                {<ReadOnlyAttribute title = "Module" value = {bot.module.type}/>}
                {<ReadOnlyAttribute title = "Battery" value = {30+"%"}/>}
                {<NumberAndBarInput value ={x} setValue = {
                    (change : number)=>{
                        setX(change as number)
                        fleetUpdate()
                    }
                } boundary = {[-100, 100]} title = "X"/>}
                {<NumberAndBarInput value ={y} setValue = {()=>{
                    (change: number)=>{
                        setY(change as number)
                        fleetUpdate()
                    }
                    
                }} boundary = {[-100, 100]} title = "Y"/>}
                {<NumberAndBarInput value ={angle} setValue = {()=>{
                    (change: number)=>{
                        setAngle(change as number)
                        fleetUpdate()
                    }
                }} boundary = {[0, 180]} title = "Angle"/>}
                {<ColorInput value = {ledColor} setValue = {()=>{
                    (change: number[])=>{
                        setLedColor(change as number[])
                        fleetUpdate()
                    }
                }} title = "LED Color"/>}
                {<ExpandableAttribute value={ledAnimation} setValue = {()=> {
                    (change: { flashingFrequency?: number | undefined;
                        animationMode: "constant" | "flashing";})=>{
                        setLedAnimation(change as {
                            flashingFrequency?: number | undefined;
                            animationMode: "constant" | "flashing";
                        })
                        fleetUpdate()
                    }
                }} title = "frequency"/> }

        </table>

    </div>
</div>
   )
}

export function EditorUI({ contents }: { contents: { name: string, value: string | number, setValue: (value: string | number) => void, inputType: "number" | "string" | "color" }[] }) {
    const component = {}
    contents.map((content) =>{
        if (content.inputType === "number") {
            // <NumberAndBarInput value ={content.value} setValue = {()=>{}} />
        } else if (content.inputType === "string") {

        } else if (content.inputType === "color") {

        }
    })
    return (
        <div className="h-full overflow-clip ">
            <div className="h-full w-full p-2 overflow-y-auto">

                <table
                    id="attributes"
                    className=" font-bold h-full w-full rounded p-5 bottom-0 overflow-y-auto overflow-x-hidden">

                </table>

            </div>
        </div>
    )
}

function NumberAndBarInput({ value, setValue, boundary, title }: { value: number, setValue: (value: number)=> void, boundary: [number, number], title: string }) {
    const InputElemRef = useRef<HTMLInputElement>(null)
    const barElemRef = useRef<HTMLInputElement>(null)
    return (
        <tbody>
            <tr>
                <th>{title}</th>
                <td>
                    <input
                        ref={InputElemRef}
                        type={"number"}
                        id={"micNum" + title}
                        min={boundary[0]}
                        max={boundary[1]}

                        defaultValue={value}
                        onChange={() => {
                            const numVal = parseInt(InputElemRef.current!.value)
                            if (numVal <= boundary[1] && numVal >= boundary[0]) {
                                barElemRef.current!.value = InputElemRef.current!.value
                                setValue(numVal)
                            } else {
                                alert("value must be between" + boundary[0] + "and" + boundary[1])
                                console.log(value)
                                InputElemRef.current!.value = barElemRef.current!.value
                            }
                        }}
                    ></input>
                </td>
            </tr>

            {barINput(barElemRef, InputElemRef, boundary, title, value, setValue)}
        </tbody>
    )
}

function barINput(barElemRef: React.RefObject<HTMLInputElement>, InputElemRef: React.RefObject<HTMLInputElement>, boundary: [number, number], title: string,value:number, setValue: (value: number) => void) {
    return (
        <tr>
            <th> </th>
            <td>
                <input
                    ref={barElemRef}
                    type={"range"}
                    id={"micBar" + title}
                    min={boundary[0]}
                    max={boundary[1]}
                    defaultValue={value}
                    step={1}
                    onChange={() => {
                        // When the range input is changed, useRef to get the input element
                        // and set the value of the input element to the value of the range input
                        InputElemRef.current!.value = barElemRef.current!.value
                        setValue(parseInt(barElemRef.current!.value))
                    }}
                ></input>
            </td>
        </tr>
    )
}

function fleetUpdate() {
    const services = useContext(ServiceContext);
    const provider = useContext(TopicContext);
    const fleet = provider?.fleet;
    useCallback(
        _.debounce((newFleet: FleetState) => {
            console.log("Updating fleet")
            console.log(newFleet)
            // console.log(newFleet)
            services?.recallFleetState.callback(getRecallFleetState(newFleet))

        }, 100, { "leading": false, "trailing": true, 'maxWait': 100 })
        , [services?.recallFleetState])(fleet as FleetState)

}

function StringInput({ title, value, setValue }: { title: string, value: string, setValue: (value: string) => void }) {
    const InputElemRef = useRef<HTMLInputElement>(null)
    return (
        <tbody>
            <tr>
                <th>{title}</th>
                <td>
                    <input
                        type="text"
                        id={"mic" + title}
                        ref={InputElemRef}
                        className="text-center"
                        defaultValue={value}
                        size={11}
                        onChange={() => {
                            setValue(InputElemRef.current!.value)
                        }}>
                    </input>
                </td>
            </tr>
        </tbody>
    )
}

function ReadOnlyAttribute({ title, value }: { title: string, value: string | number }) {
    return (
        <tr>
            <th>{title}</th>
            <td>
                <button
                    className="text-center mb-2 h-6 w-32 "
                    id={"mic" + title}>

                    {value}
                </button>
            </td>
        </tr>
    )
}

function ColorInput({ title, value, setValue }: { title: string, value: number[], setValue: (value: number[]) => void }) {
    const InputElemRef = useRef<HTMLInputElement>(null)
    return (
        <tr>
            <th>{title}</th>
            <td>
                <input
                    ref={InputElemRef}
                    type={"color"}
                    id={"mic" + title}
                    defaultValue={rgbToHex(value)}
                    onChange={() => {
                        const rgb = hexTorgb(InputElemRef.current!.value)
                        // When the range input is changed, useRef to get the input element
                        // and set the value of the input element to the value of the range input
                        setValue(rgb)
                    }}
                ></input>
            </td>
        </tr>
    )
}
function ExpandableAttribute({ title, value, setValue }: {
        title: string, value: { flashingFrequency?: number | undefined, animationMode: "flashing" | "constant" },
        setValue: (value: { flashingFrequency: number, animationMode: string }) => void
}) {
        const [isExpanded, setIsExpanded] = useState(value.animationMode === "flashing")
        return (
            <tbody>
                <tr>
                    <th>{title}</th>
                    <td>
                        <select
                            className=" ui-shadow ui-highlight ui-div h-6 w-32 text-center"
                            value={value.animationMode}
                            onChange={() => {
                                if (isExpanded) {
                                    setValue({ flashingFrequency: 0, animationMode: "constant" })
                                    setIsExpanded(false)
                                } else {
                                    setValue({ flashingFrequency: 5, animationMode: "flashing" })
                                    setIsExpanded(true)
                                }
                            }}>
                            <option value="constant" className="bg-zinc-700">Constant</option>
                            <option value="flashing" className="bg-zinc-700" >Flashing</option>

                        </select>
                    </td>
                </tr>
                {isExpanded ? 
                <NumberAndBarInput title={"Flashing Frequency"} value={value.flashingFrequency!} 
                boundary = {[1,10]} setValue={(value) => {}} /> : null}

            </tbody>

        )
}





