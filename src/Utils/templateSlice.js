import {createSlice} from "@reduxjs/toolkit";

const templateSlice=createSlice({
    name:"templates",
    initialState:{
        templatesArr:[]
    },
    reducers:{
        addTemplates:(state,action)=>{
            state.templatesArr.push(action.payload)
        },
        setTemplates:(state,action)=>{
            state.templatesArr = action.payload
        }
    }
})
export const {addTemplates,setTemplates}=templateSlice.actions
export default templateSlice.reducer