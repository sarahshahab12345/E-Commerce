import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./Auth-Slice/auth-slice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    
  },
});


export default store;
