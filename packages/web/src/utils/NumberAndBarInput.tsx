import { Fragment, useCallback, useRef, useState } from "react"


export default function NumberAndBarInput( {title, value,setValue, boundary} : {title: string, value : number, setValue: (value: number) => void, boundary: {min: number, max: number}}){
    const inputRef = useRef<HTMLInputElement>(null)
    const rangeRef = useRef<HTMLInputElement>(null)  
    return(
      <Fragment>
        <tr>
                  <th>{title}</th>
                  <td>
                    <input
                      ref={inputRef}
                      type={"number"}
                      id={"micInput" + title}
                      min={boundary.min}
                      max={boundary.max}
  
                      value={Math.round(value)}
                      onChange={() => {
                        const val = parseInt(inputRef.current!.value)

                        if (val <= boundary.max && val >= boundary.min ) {
                          rangeRef.current!.value = inputRef.current!.value
                          setValue(val)
                        } else {
                          if(! Number.isNaN(val)){
                            console.log(val)
                            alert(title +" value must be between "+boundary.min+ " and " + boundary.max)
                            inputRef.current!.value = rangeRef.current!.value

                          }

                        }
  
  
                      }}
  
                    ></input>
                  </td>
                </tr>
  
                <tr>
                  <th> </th>
                  <td>
                    <input
                      ref={rangeRef}
                      type={"range"}
                      id={"micRange" + title}
                      min={boundary.min}
                      max={boundary.max}
                      value={Math.round(value)}
                      step={1}
                      onChange={() => {
                        // When the range input is changed, useRef to get the input element
                        // and set the value of the input element to the value of the range input
                        const val = parseInt(rangeRef.current!.value)
                        inputRef.current!.value = rangeRef.current!.value
                        setValue(val)
                      }}
                    ></input>
                  </td>
                </tr>
      </Fragment>
    )
  }