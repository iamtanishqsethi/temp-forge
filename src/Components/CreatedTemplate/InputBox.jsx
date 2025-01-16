import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

const InputBox=()=>{
    return (
        <div className={'flex flex-col justify-center items-center h-1/2 w-full'}>
            <div
                className={'bg-gradient-to-br from-zinc-950/10 to-zinc-800/10 border-2 border-red-700 backdrop-blur-xl  rounded-lg shadow-lg w-full h-2/3 '}>
                <div className="flex flex-col justify-between items-start">
                    <h1 className="text-white text-lg font-medium p-2 mx-2 my-1">
                        <DoubleArrowIcon sx={{fontSize: 30}} className={'text-red-700'}/> Input
                    </h1>
                    <div className={'h-1 w-1/2 rounded-lg px-2 mx-2 bg-red-700'}></div>
                </div>

            </div>
        </div>
    )
}
export default InputBox