import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL=import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL:BASE_URL,
    headers:{
        "Content-Type":"application/json"
    },
});
axiosInstance.interceptors.request.use((config)=>{
    const token = Cookies.get("auth-token");
    if(token){
        config.headers["Authorization"]=`Bearer ${token}`;
    } 
    return config;
})
export default axiosInstance;