import Cookies from "js-cookie";
import { showNotifications } from "../../utils/notifications";
import axiosInstance from "../axiosInstance";
import { createContext, useContext } from "react";



const register_URL='api/register';
const Login_URL='api/login';
const Logout_URL='api/logout';

type RegisterData = {
    gender?:string;
    lastname?:string;
    firstname?:string;
    phone?:number;
    email?: string;
    password?: string;
    password_confirmation?: string;
};

const register = async(data:RegisterData,setToken: (token: string | null) => void)=>{
    try
    {
       return await axiosInstance.post(`${register_URL}`,data)
       .then(async(response)=>{

        const result = await response?.data;
        console.log("result",result)
        const token = result?.data?.token;
        const profile=JSON.stringify(result?.data?.user);
        const userType = result?.data?.type;
        
        Cookies.set('auth-token',token);
        localStorage.setItem("userType",userType)
        localStorage.setItem("profile",profile);


        setToken(token  )

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
type LoginData={
    email?: string;
    password?: string;
}
const Login = async(data:LoginData, setToken: (token: string | null) => void)=>{

    try{
        return await axiosInstance.post(`${Login_URL}`,data)
        .then(async(response)=>{
            const result = await response?.data;
            console.log("result",result)
            const token = result?.data?.token;
            const profile=JSON.stringify(result?.data?.user);
            const userType = result?.data?.type;

            Cookies.set('auth-token',token);
            localStorage.setItem("profile",profile);
            localStorage.setItem("userType",userType);

            setToken(token); 

            return{
                data:result,
                status:response?.status
            };
        });
    }
    catch(error:any){
        const errorDetails = error.response?.data?.message|| {};
        console.log(error);
        showNotifications(errorDetails, "error")
        // // لعرض كل الأخطاء الموجودة ضمن كائن (error)
        // Object.values(errorDetails).forEach((messages: any) => {
        //     if (Array.isArray(messages)) {
        //         messages.forEach((msg) => showNotifications(msg, "error"));
        //     }
        // });
    }

}
const Logout = async(setToken: (token: string | null) => void)=>{
    try{
        const response = await axiosInstance.post(`${Logout_URL}`);
        if (response.status === 200){
            Cookies.remove('auth-token');
            localStorage.removeItem("profile");
            localStorage.removeItem('userType');

            setToken(null);

        }
        return{
            status: response.status
        }
    }
    catch(error:any){
        const errorDetails = error.response?.data?.message|| {};
        console.log(error);
        showNotifications(errorDetails, "error")
    }

}
export const authServices = {
    register,
    Login,Logout
  };