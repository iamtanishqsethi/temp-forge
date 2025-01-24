import Suggestions from "./Suggestions";
import TemplateBox from "./TemplateBox";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
const Newtemplate=()=>{

    return (
        <div
            className={'flex flex-col  items-start justify-between h-screen bg-gradient-to-tl from-amber-700 via-zinc-900 to-zinc-950 text-white'}>
            <div className={'flex flex-col justify-center items-start mt-20 h-[15%] w-full px-16 '}>
                <h1 className={'text-5xl font-bold '}> Create a New Template <DoubleArrowIcon sx={{fontSize:50}} className={'text-blue-700'}/></h1>
                <div className={'h-1.5 w-1/3 rounded-lg  my-3 bg-blue-700'}></div>
            </div>
            <div className={'flex  items-center justify-around h-[75%] w-full '}>
                <Suggestions/>
                <TemplateBox/>
            </div>



        </div>
    )
}
export default Newtemplate;