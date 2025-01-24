import WhatshotIcon from '@mui/icons-material/Whatshot';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import {useNavigate} from "react-router-dom";
const Welcome=()=>{
    const navigate = useNavigate();
    return (
        <div className={'px-36 flex flex-row items-center justify-between h-screen bg-gradient-to-tl from-amber-700 via-zinc-900 to-zinc-950 text-white'}>

            <div className={' w-[45%] px-2 py-8 text-left'}>
                <p className={'text-6xl font-bold p-2 m-2 '}>Template Forge <WhatshotIcon sx={{ fontSize: 50 }} className={'text-amber-500'}/></p>
                <h1 className={'text-3xl font-bold p-2 m-2 '}>
                    Transform Inputs into Actionable Insights
                </h1>
                <p className={'text-lg text-gray-300 px-2 m-2'}>Your ultimate tool for structured thinking and creative expression</p>
                <button
                    className={'border-2 border-amber-500  bg-transparent rounded-lg font-bold text-white px-5 py-3 m-2 '}
                    onClick={()=>navigate("/login")}
                >Get started <WhatshotIcon className={'text-amber-500'}/> </button>
            </div>

            <div className={'w-[45%] text-right px-10'}>
                    <div className="relative bg-zinc-700/60 rounded-lg p-6 w-[390px] h-[390px] space-y-4">

                        <div className="bg-gradient-to-br from-zinc-950/10 to-zinc-800/10 border border-gray-500 backdrop-blur-xl p-4 rounded-lg shadow-lg absolute left-60 -top-12 w-[350px] h-[150px]">
                            <div className="flex flex-col justify-between items-start">
                                <span className="text-white text-sm font-medium"><DonutSmallIcon sx={{fontSize:20}} className={'text-blue-700'}/> Template</span>
                                <div className={'h-1 w-1/2 rounded-lg my-1 bg-blue-700'}></div>
                            </div>

                        </div>


                        <div className="bg-gradient-to-br from-zinc-950/10 to-zinc-800/10 border border-gray-500 backdrop-blur-xl p-4 rounded-lg shadow-lg absolute -left-20 top-28 w-[350px] h-[150px]">
                            <div className="flex flex-col justify-between items-start">
                                <span className="text-white text-sm font-medium"><DoubleArrowIcon sx={{fontSize: 20}}
                                                                                                 className={'text-orange-500'}/> Input</span>
                                <div className={'h-1 w-1/2 rounded-lg my-1 bg-orange-500'}></div>
                            </div>

                        </div>


                        <div
                            className="bg-gradient-to-br from-zinc-950/10 to-zinc-800/10 border border-gray-500 backdrop-blur-xl p-4 rounded-lg shadow-lg absolute left-60 top-72 w-[350px] h-[150px]">
                            <div className="flex flex-col justify-between items-start">
                                <span className="text-white text-sm font-medium"><ElectricBoltIcon sx={{fontSize: 20}}
                                                                                                 className={'text-yellow-500'}/> Prompt</span>
                                <div className={'h-1 w-1/2 rounded-lg my-1 bg-yellow-500'}></div>
                            </div>
                        </div>
                    </div>
            </div>

        </div>
    )
}
export default Welcome;