import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./Auth-Slice/auth-slice.js";
import productReducer from "./Admin-slice/product-slice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});


export default store;
