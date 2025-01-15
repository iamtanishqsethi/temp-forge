import {createSlice} from "@reduxjs/toolkit";

const configSlice=createSlice({
    name:'config',
    initialState:{
        isSidebarOpen:false,
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
        }

    }
})
export const{openSideBar,closeSideBar,toggleSideBar}=configSlice.actions
export default configSlice.reducer