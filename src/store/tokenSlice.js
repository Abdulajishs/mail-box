import { createSlice } from "@reduxjs/toolkit";

const intialTokenState = {
    idToken : localStorage.getItem("tokenId") || "",
    userLoggedIn : !! localStorage.getItem("tokenId"),
    userId : localStorage.getItem("userId"),
}
const tokenSlice = createSlice({
    name : "token",
    initialState : intialTokenState,
    reducers : {
        addToken(state,action){
            state.idToken = action.payload;
            state.userLoggedIn = true;
            localStorage.setItem("tokenId",action.payload)
        },
        removeToken(state,action){
            state.idToken = "";
            state.userLoggedIn = false;
            localStorage.removeItem("tokenId")
        },
        addUserId(state,action){
            state.userId = action.payload;
            localStorage.setItem("userId",action.payload)
        },
        removeUserId(state,action){
            state.userId = "";
            localStorage.removeItem("userId")
        },
    }
})

export const tokenAction = tokenSlice.actions;

export default tokenSlice.reducer;