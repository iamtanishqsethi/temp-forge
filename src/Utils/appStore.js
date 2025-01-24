import {configureStore} from "@reduxjs/toolkit";
import configSlice from "./configSlice";
import promptSlice from "./promptSlice";
import userSlice from "./userSlice";

const appStore=configureStore({
    reducer:{
        config:configSlice,
        prompt:promptSlice,
        user:userSlice
    }
})
export default appStore;