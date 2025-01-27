import CurrentTemplate from "./CurrentTemplate";
import InputBox from "./InputBox";
import Output from "./Output";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const ExistingPrompt=()=>{
    const { id, promptId } = useParams();
    const navigate = useNavigate();

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
    const currentPrompt=currentTemplate?.prompts.find((item)=>item.id==promptId)

    return (
        <div className={'flex items-center justify-center h-full w-[65%] '}>
            <div className={'flex flex-col items-center  justify-around h-full w-[40%]   '}>
                <CurrentTemplate template={currentTemplate?.templateStr}/>
                <InputBox data={currentPrompt?.data}/>
            </div>
            <Output value={currentPrompt?.value}/>
        </div>
    )
}
export default ExistingPrompt;