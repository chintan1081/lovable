import axios from "axios";
import Cookies from "js-cookie";

export const Post = async (url: string, data: any, headers?: any) => {
    const token = Cookies.get("token");
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}${url}`,{
            ...data
        },{
            headers: {
                "authorization": `Bearer ${token}`,
                ...headers
            }
        })
    }

export const Get = async (url: string, headers?: any) => {
    const token = Cookies.get("token");
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}${url}`,{
            headers: {
                "authorization": `Bearer ${token}`,
                ...headers
            }
        })
    }