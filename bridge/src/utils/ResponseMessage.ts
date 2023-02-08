export type responseMessage = {
    responseType: responseType,
    message:string,
    responseData?:any
}
export type responseType = 'error' |'success'