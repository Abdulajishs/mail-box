import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token-slice";
import mailReducer from "./mail-slice";



const store = configureStore(
    {reducer : {token : tokenReducer , mail : mailReducer}}
)

export default store;