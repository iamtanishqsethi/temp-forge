import {createSlice} from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'userSlice',
    initialState:{
        userId:null,
    },
    reducers:{
        addNewUser:(state,action)=>{
            state.userId=action.payload
        },
        removeUser:(state)=>{
            state.userId=null;
        }
    },

})
export const {addNewUser,removeUser} = userSlice.actions;
export default userSlice.reducer;
