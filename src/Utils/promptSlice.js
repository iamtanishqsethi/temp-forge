import {createSlice} from "@reduxjs/toolkit";

const promptSlice=createSlice({
    name:"prompt",
    initialState:{
        templateArray:[]
    },
    reducers:{
        addNewTemplate:(state,action)=>{
            state.templateArray.push(action.payload)
        },
        addNewPrompt:(state,action)=>{
            const {templateId,prompt}=action.payload
            const template=state.templateArray.find(item=>item.id==templateId)
            if(template){
                if (!template.prompts) {
                    template.prompts = []; // Initialize prompts array if undefined
                }
                state.templateArray.prompts.push(prompt)
            }

        }

    }
})
export const {addNewTemplate,addNewPrompt}=promptSlice.actions;
export default promptSlice.reducer