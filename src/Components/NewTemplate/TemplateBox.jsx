import {useNavigate} from "react-router-dom";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import {useDispatch} from "react-redux";
import {useState} from "react"
import {addNewTemplate} from "../../Utils/promptSlice";
import useTemplateExecute from "../../Hooks/useTemplateExecute";

const TemplateBox=()=>{
    const [template,setTemplate]=useState("")
    const {templateData,processTemplate}=useTemplateExecute({templateStr:template})


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleExecute=()=>{
        if (!template.trim()) {
            alert("Please enter a valid template.")
            return
        }
        processTemplate()

        if (templateData) {
            dispatch(addNewTemplate(templateData));
            navigate(`/template/created/${templateData.id}/new`)
        } else {
            alert("Failed to process the template. Please try again.")
        }
    }
    return (
        <div className={'flex flex-col justify-center items-center h-full w-[55%] '}>
            <div
                className={'bg-gradient-to-br from-zinc-950/10 to-zinc-800/10 border-2 border-blue-700 backdrop-blur-xl  rounded-lg shadow-lg  w-full  h-full mx-8  my-6 '}>
                <div className="flex flex-col justify-between items-start">
                    <h1 className="text-white text-lg font-medium p-2 mx-2 my-1">
                        <DonutSmallIcon sx={{fontSize: 30}} className={'text-blue-700'}/> Template
                    </h1>
                    <div className={'h-1 w-1/2 rounded-lg px-2 mx-2 bg-blue-700'}></div>
                </div>
                <textarea className={'text-white bg-transparent w-full my-4 mx-2 h-3/5 outline-none p-4'}
                          placeholder={'Enter the template here'}
                            onChange={(e)=>setTemplate(e.target.value)}
                >

                </textarea>
                <button className={'bg-blue-700 px-5 py-3 m-4 rounded-lg '}
                        onClick={handleExecute}
                >Execute
                </button>
            </div>
        </div>
    )
}
export default TemplateBox;