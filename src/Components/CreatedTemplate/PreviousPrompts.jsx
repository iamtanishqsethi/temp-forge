import Prompt from "./Prompt";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const PreviousPrompts = () => {

    const {id} = useParams()
    const navigate = useNavigate();
    const templatesArr = useSelector((store) => store.templates.templatesArr)
    const currentTemplate = templatesArr.find((item) => item.id == id)


    return (
        <div
            className={'border-2 border-black rounded-3xl w-full h-[50vh] md:h-[50vh] p-3 md:p-6 flex flex-col items-center '}>
            <div className={'flex items-center justify-end w-full'}>
                <button
                    onClick={() => navigate(`/template/created/${id}/new`)}
                    className={'px-3 md:px-4 py-1 bg-black rounded-full text-white text-sm md:text-base'}>New
                </button>
            </div>
            <div className={'flex flex-col items-center overflow-y-auto mt-2 w-full'}>
                {currentTemplate?.prompts.length === 0 ? (
                    <p className={'p-2 md:p-4 m-2 md:m-4 text-base md:text-lg'}>No Prompts for this template</p>
                ) : currentTemplate?.prompts.map((prompt, index) => (
                    <Link to={`/template/created/${id}/${prompt?.id}`} className="w-full" key={index}><Prompt
                        prompt={prompt}/></Link>
                ))}

            </div>

        </div>


    )
}
export default PreviousPrompts;