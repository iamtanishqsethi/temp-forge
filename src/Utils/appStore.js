import {configureStore} from "@reduxjs/toolkit";
import configSlice from "./configSlice";

const appStore=configureStore({
    reducer:{
        config:configSlice
    }
})
export default appStore;