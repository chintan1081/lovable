import axios from "axios";
import Cookies from "js-cookie";

export const Post = async (url: string, data: any, headers?: any) => {
    const token = Cookies.get("token");
    if (token) {
        return await axios.post(url,{
            ...data
        },{
            headers: {
                "authorization": `Bearer ${token}`,
                ...headers
            }
        })
    }
    window.location.href = '/signin';
}