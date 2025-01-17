import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {compiler} from "../Compiler/compiler";
import {addNewPrompt} from "../Utils/promptSlice";
const generatePromptId = () => {
    return `prompt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
const useTemplateRender=({id,updatedData})=>{
    const templateArray=useSelector((store)=>store.prompt.templateArray)
    const template=templateArray.find((item)=>item.id==id)
    const [promptId,setPromptId]=useState(null)
    const dispatch = useDispatch();

    const compileTemplate=()=>{
        if (!template) {
            console.error(`Template with id "${id}" not found.`);
            return;
        }

        const {AST} = template;
        const output=compiler(AST,updatedData)
        const proId=generatePromptId()
        setPromptId(proId)
        dispatch(addNewPrompt({templateId:id,prompt:{
            promptId:proId,
                outputStr:output,
                data:updatedData,
            }})
        )


    }
    useEffect(()=>{
        if(id && updatedData){
            compileTemplate()
        }
    },[id,updatedData])

    return promptId;
}
;