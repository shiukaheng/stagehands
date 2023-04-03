
export default function Tutorial({title, description, video} : {title: string, description : string, video: string}) {
    return (
        <div className="flex flex-col items-center gap-3 justify-center">
            <h1 className="font-bold"> {title}</h1>
            <p className="text-center"> {"Description : " +description}</p>
            <video width="320" height="240" className=" border-white border" controls 
            src = {video}>
            </video>
            
        </div>
    )
}