import axios from "axios"
import { mailAction } from "./mail-slice";

export const fetchSent = (emailId) => {
    const userId = emailId.replace(/\./g, "");
    return async (dispatch) => {
        const sentRequest = async (userId) => {
            try {
                const response = await axios.get(`https://mail-box-feaa3-default-rtdb.firebaseio.com/emails/sent/${userId}.json`);
                const data = response.data;
                if (response.status === 200) {
                    // console.log(response.data);
                    if (data) {
                        const keys = Object.keys(data)
                        const sent = keys.map((key) => ({ id: key, ...data[key] }))
                        // console.log(sent)
                        dispatch(mailAction.replaceSent(sent))
                    } else {
                        dispatch(mailAction.replaceSent([]))
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        await sentRequest(userId)
    }
}

export const fetchReceived = (emailId) => {
    const userId = emailId.replace(/\./g, "");
    return async (dispatch) => {
        const sentRequest = async (userId) => {
            try {
                const response = await axios.get(`https://mail-box-feaa3-default-rtdb.firebaseio.com/emails/received/${userId}.json`);
                const data = response.data;
                // console.log(data);
                if (response.status === 200) {
                    if (data) {
                        const keys = Object.keys(data);
                        const received = keys.map((key) => ({ id: key, ...data[key] }))
                        dispatch(mailAction.replaceReceived(received))
                        // console.log(received);
                    } else {
                        dispatch(mailAction.replaceReceived([]))
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        await sentRequest(userId)
    }
}

export const updateReceived = (email, mail) => {
    const userId = email.replace(/\./g, "")
    // console.log(userId,mail);
    const body = { ...mail }
    delete body.id
    // console.log(body);
    return async (dispatch) => {
        const sentRequest = async (userId) => {
            try {
                const response = await axios.put(`https://mail-box-feaa3-default-rtdb.firebaseio.com/emails/received/${userId}/${mail.id}.json`,
                    { ...body, hasRead: true, count: 0 }
                )
                if (response.status === 200) {
                    // console.log(response);
                }
            } catch (error) {
                console.log(error);
            }
        }
        await sentRequest(userId)
    }
}

export const deleteReceived = (email, mail) => {
    const userId = email.replace(/\./g, "")
    return async () => {
        const sentRequest = async (userId, mail) => {
            const response = await axios.delete(`https://mail-box-feaa3-default-rtdb.firebaseio.com/emails/received/${userId}/${mail.id}.json`)
            try {
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        await sentRequest(userId, mail)
    }
}

export const deleteSent = (email, mail) => {
    const userId = email.replace(/\./g, "")
    return async () => {
        const sentRequest = async (userId, mail) => {
            const response = await axios.delete(`https://mail-box-feaa3-default-rtdb.firebaseio.com/emails/sent/${userId}/${mail.id}.json`)
            try {
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        await sentRequest(userId, mail)
    }
}