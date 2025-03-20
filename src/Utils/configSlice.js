import {createSlice} from "@reduxjs/toolkit";

const configSlice=createSlice({
    name:'config',
    initialState:{
        isSidebarOpen:false,
        showHistory:true,
    },
    reducers:{
        openSideBar(state){
            state.isSidebarOpen=true;
        },
        closeSideBar(state){
            state.isSidebarOpen=false
        },
        toggleSideBar(state){
            state.isSidebarOpen=!state.isSidebarOpen
        },
        toggleShowHistory(state){
            state.showHistory=!state.showHistory
        }

    }
})
export const{openSideBar,closeSideBar,toggleSideBar,toggleShowHistory}=configSlice.actions
export default configSlice.reducer