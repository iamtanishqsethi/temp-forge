import {useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {compiler} from "../Compiler/compiler";
import { v4 as uuidv4 } from 'uuid';
import {database} from "../Utils/firebase-config";
import {doc,updateDoc} from "firebase/firestore";


const useTemplateRender=(id)=>{

    const templatesArr=useSelector((store)=>store.templates.templatesArr)
    const currentTemplate=templatesArr.find((item)=>item.id==id)
    const [PromptArr,setPromptArr]=useState([])
    const userId=useSelector((state)=>state.user);

    useEffect(() => {
        if(currentTemplate?.prompts){
            setPromptArr(currentTemplate.prompts);
        }
    }, [currentTemplate]);


    const compileTemplate=useCallback(async (updatedData)=>{
        try{
            if(!currentTemplate||!userId){
                throw new Error("Template or user not found");
            }
            const outputPrompt=compiler(currentTemplate.AST,updatedData)
            const newPrompt={
                id:uuidv4(),
                value:outputPrompt,
                data:updatedData,
            }
            const updatedPrompts=[...PromptArr,newPrompt];
            await updateDoc(doc(database,userId,id),{
                prompts:updatedPrompts
            })
            setPromptArr(updatedPrompts)

            return newPrompt.id

        }
        catch (error){
            console.log("failed to compile and add prompt")
            throw error;
        }

    },[userId,currentTemplate,id])

    return compileTemplate;
}
export default useTemplateRender
