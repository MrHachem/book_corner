import Cookies from "js-cookie";
import { showNotifications } from "../utils/notifications";
import axiosInstance from "./axiosInstance";

const register_URL='api/register';

const register = async(data:any)=>{
    try
    {
       return await axiosInstance.post(`${register_URL}`,data)
       .then(async(response)=>{

        const result = await response?.data;
        const token = result?.token;
        const profile=JSON.stringify(result?.body?.auth);
        Cookies.set('auth-token',token);
        localStorage.setItem("profile",profile);

        return{
            data:result,
            status:response?.status
        };
       });
    }
    catch(error:any)
    {
        const errorDetails = error.response?.data?.errors || {};
    
        // لعرض كل الأخطاء الموجودة ضمن كائن (error)
        Object.values(errorDetails).forEach((messages: any) => {
            if (Array.isArray(messages)) {
                messages.forEach((msg) => showNotifications(msg, "error"));
            }
        });
    
       
    } 

}
export const authServices = {
    register
  };