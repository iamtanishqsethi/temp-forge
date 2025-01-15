import {useNavigate} from "react-router-dom";

const Template=()=>{
    const navigate = useNavigate();
    const handleExecute=()=>{
        navigate("/created")
    }
    return (
        <div className={'flex flex-col justify-center items-center h-full w-[55%] '}>
            <div className={'bg-gradient-to-br from-zinc-950/10 to-zinc-800/10 border border-gray-500 backdrop-blur-xl  rounded-lg shadow-lg  w-3/4 h-4/5 mt-20'}>
                <h1
                    className={'font-bold text-white bg-blue-700 px-4 py-2 rounded-t-lg'}
                >Template</h1>
                <textarea className={'text-white bg-transparent w-full h-4/5 p-4'} placeholder={'Enter the template here'}>

                </textarea>
                <button className={'bg-blue-700 px-4 py-3 m-2 rounded '}
                    onClick={handleExecute}
                >Execute</button>
            </div>
        </div>
    )
}
export default Template;