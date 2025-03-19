import {configureStore} from "@reduxjs/toolkit";
import configSlice from "./configSlice";
import promptSlice from "./promptSlice";
import userSlice from "./userSlice";
import templateSlice from "./templateSlice";
import editSlice from "./editSlice";

const appStore=configureStore({
    reducer:{
        config:configSlice,
        prompt:promptSlice,
        user:userSlice,
        templates:templateSlice,
        edit:editSlice,
    }
})
export default appStore;