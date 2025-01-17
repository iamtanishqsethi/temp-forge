import {configureStore} from "@reduxjs/toolkit";
import configSlice from "./configSlice";
import promptSlice from "./promptSlice";

const appStore=configureStore({
    reducer:{
        config:configSlice,
        prompt:promptSlice
    }
})
export default appStore;