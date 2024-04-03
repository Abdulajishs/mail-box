import { createSlice } from "@reduxjs/toolkit";

const intialTokenState = {
    idToken : localStorage.getItem("tokenId") || "",
    userLoggedIn : !! localStorage.getItem("tokenId"),
    userId : localStorage.getItem("userId"),
    email : localStorage.getItem("email")
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
        addEmail(state,action){
            state.email = action.payload;
            localStorage.setItem("email",action.payload)
        },removeEmail(state,action){
            state.userId = "";
            localStorage.removeItem("email")
        },
    }
})

export const tokenAction = tokenSlice.actions;

export default tokenSlice.reducer;