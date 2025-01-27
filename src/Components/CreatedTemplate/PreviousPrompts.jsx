import Prompt from "./Prompt";
import RestoreIcon from '@mui/icons-material/Restore';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const PreviousPrompts=()=>{

    const {id}=useParams()
    const navigate = useNavigate();
    const templatesArr=useSelector((store)=>store.templates.templatesArr)
    const currentTemplate=templatesArr.find((item)=>item.id==id)


    return (

            <div className={'flex flex-col justify-center items-center h-full w-[35%]'}>
                <div
                    className={'bg-gradient-to-br from-zinc-950/10 to-zinc-800/10  border-2 border-blue-700 backdrop-blur-xl  rounded-lg shadow-lg  w-4/5 h-4/5 mt-20'}>
                    <div className="flex justify-between items-center px-2">
                        <div className="flex flex-col justify-between items-start">
                            <h1 className="text-white text-lg font-medium p-2 mx-2 my-1">
                                <RestoreIcon sx={{fontSize: 30}} className={'text-blue-700'}/> Previous Prompts
                            </h1>
                            <div className={'h-1 w-full rounded-lg px-2 mx-2 bg-blue-700'}></div>
                        </div>
                        <button
                            className="text-white  bg-blue-700 rounded px-5 py-2 text-sm font-medium m-2"
                            onClick={()=>navigate(`/template/created/${id}/new`)}
                        >
                            New
                        </button>
                    </div>
                    <div className={'flex  flex-col items-center overflow-y-auto '}>
                        {currentTemplate?.prompts.length===0? (
                            <p className={'p-4 m-4 text-lg'}>No Prompts for this template</p>
                        ):currentTemplate?.prompts.map((prompt, index) => (
                            <Link to={`/template/created/${id}/${prompt?.id}`} key={index}><Prompt prompt={prompt}/></Link>
                        ))}

                        </div>


                </div>
            </div>

    )
}
export default PreviousPrompts;