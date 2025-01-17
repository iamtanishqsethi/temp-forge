import CurrentTemplate from "./CurrentTemplate";
import NewInput from "./NewInput";
import EmptyOutput from "./EmptyOutput";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Error from "../Error";

const NewPrompt=()=>{
    const navigate = useNavigate();
    const {id} = useParams();
    const templateArray=useSelector((store)=>store.prompt.templateArray)
    if(!templateArray){
        navigate("/error")
        return;
    }
    const currentTemplate=templateArray.find((item)=>item.id==id)

    if(!currentTemplate){
        navigate("/error")
        return;
    }
    return (
        <div className={'flex items-center justify-center h-full w-[65%] '}>
            <div className={'flex flex-col items-center  justify-around h-full w-[40%]   '}>
                <CurrentTemplate template={currentTemplate?.template}/>
                <NewInput data={currentTemplate?.data}/>
            </div>
            <EmptyOutput/>
        </div>
    )
}
export default NewPrompt;