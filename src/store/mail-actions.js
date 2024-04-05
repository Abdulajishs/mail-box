import axios from "axios"
import { mailAction } from "./mail-slice";

export const fetchSent =(userId)=>{
    return async(dispatch)=>{
        const sentRequest = async (userId)=>{
            try {
                const response  = await axios.get(`https://mail-box-feaa3-default-rtdb.firebaseio.com/emails/sent/${userId}.json`);
                const data  = response.data;
                if (response.status === 200) {
                    // console.log(response.data);
                    if (data) {
                        const keys = Object.keys(data)
                        const sent = keys.map((key)=> ({id : key , ...data[key]}))
                        console.log(sent)
                        dispatch(mailAction.replaceSent(sent))
                    } 
                }
            } catch (error) {
                console.log(error);
            }
        }
        await sentRequest(userId)
    }
}

export const fetchReceived =(userId)=>{
    return async(dispatch)=>{
        const sentRequest = async (userId)=>{
            try {
                const response  = await axios.get(`https://mail-box-feaa3-default-rtdb.firebaseio.com/emails/received/${userId}.json`);
                const data = response.data;
                console.log(data);
                if (response.status === 200) {
                    if(data){
                        const keys = Object.keys(data);
                        const received = keys.map((key) =>({id : key , ...data[key]}))
                        dispatch(mailAction.replaceReceived(received))
                        console.log(received);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        await sentRequest(userId)
    }
}