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
        }
    }
})
export const {addEdit} = editSlice.actions;
export default editSlice.reducer;