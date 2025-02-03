import CurrentTemplate from "./CurrentTemplate";
import NewInput from "./NewInput";
import EmptyOutput from "./EmptyOutput";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";


const NewPrompt=()=>{
    const navigate = useNavigate();
    const {id} = useParams();
    const templatesArr=useSelector((store)=>store.templates.templatesArr)
    if(!templatesArr){
        navigate("/error")
        return;
    }

    const currentTemplate=templatesArr.find((item)=>item.id==id)

    if(!currentTemplate){
        navigate("/error")
        return;
    }
    return (
        <div className={'flex items-center justify-center h-full w-[65%] '}>
            <div className={'flex flex-col items-center  justify-around h-full w-[40%]   '}>
                <CurrentTemplate template={currentTemplate?.templateStr}/>
                <NewInput data={currentTemplate?.data} AST={currentTemplate?.AST}/>
            </div>
            <EmptyOutput/>
        </div>
    )
}
export default NewPrompt;