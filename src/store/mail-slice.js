import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name : "mail",
    initialState : {
        sent : [],
        received : []
    },
    reducers : {
        replaceSent (state,action) {
            state.sent = action.payload
        },
        replaceReceived (state,action){
            state.received = action.payload
        }
    }
})

export const mailAction = mailSlice.actions;

export default mailSlice.reducer;