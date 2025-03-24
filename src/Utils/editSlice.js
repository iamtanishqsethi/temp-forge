import {createSlice} from "@reduxjs/toolkit";

const editSlice=createSlice({
    name:"editSlice",
    initialState:{
        title:"",
        template:"",
    },
    reducers:{
        addEdit:(state,action)=>{
            state.title=action.payload.title;
            state.template=action.payload.template;
        },
        reset:(state)=>{
            state.title="";
            state.template="";
        }
    }
})
export const {addEdit,reset} = editSlice.actions;
export default editSlice.reducer;