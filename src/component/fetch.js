import axios from "axios"
import { useEffect, useState } from "react";

const useFetch = (url) =>{
    console.log(url);
    const [data,setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(url)
            try {
                // console.log(response.data);
                setData(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [url])
    return data
}

export default useFetch;