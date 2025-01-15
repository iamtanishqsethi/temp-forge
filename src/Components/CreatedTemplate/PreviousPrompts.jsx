import Prompt from "./Prompt";

const PreviousPrompts=()=>{
    return (

            <div className={'flex flex-col justify-center items-center h-full w-[35%]'}>
                <div
                    className={'bg-gradient-to-br from-zinc-950/10 to-zinc-800/10 border border-gray-500 backdrop-blur-xl  rounded-lg shadow-lg  w-4/5 h-4/5 mt-20'}>
                    <h1
                        className={'font-bold text-white bg-red-700 px-4 py-2 rounded-t-lg'}
                    >Previous Prompts</h1>
                    <div className={'flex  flex-col items-center overflow-y-auto '}>
                        <Prompt/>
                        <Prompt/>
                        <Prompt/>
                    </div>



                </div>
            </div>

    )
}
export default PreviousPrompts;