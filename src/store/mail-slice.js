import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name: "mail",
    initialState: {
        sent: [],
        received: [],
        total: 0
    },
    reducers: {
        replaceSent(state, action) {
            state.sent = action.payload
        },
        replaceReceived(state, action) {
            state.received = action.payload
        },
        saveRecieved(state, action) {
            const newMail = action.payload
            const existingIndex = state.received.findIndex((mail) => mail.id === newMail.id);
            if (existingIndex !== -1) {
                state.received[existingIndex].hasRead = true;
                state.received[existingIndex].count = 0;
            } else {
                state.received.push(action.payload)
            }
        },
        saveSent(state, action) {
            state.sent.push(action.payload)
        },
        updateTotal(state, action) {
            state.total = action.payload;
        }, deleteMail(state, action) {
            const id = action.payload;
            state.received = state.received.filter((mail) => mail.id !== id)
        }
    }
})

export const mailAction = mailSlice.actions;

export default mailSlice.reducer;