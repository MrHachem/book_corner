import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
    token: string | null;
    userType: string | null;
    setToken: (token: string | null) => void;
    setUserType: (type: string | null) => void;
}

const AuthContext = createContext<AuthContextType| undefined>(undefined);

export const Authprovider = ({children}:{children: React.ReactNode})=>{

    const [token, setToken] = useState<string | null>(Cookies.get("auth-token") ?? null);
    const [userType, setUserType] = useState<string | null>(localStorage.getItem("userType") ?? null);


    useEffect(() => {
        const handleStorageChange = () => {
            setToken(Cookies.get("auth-token") ?? null);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // const login = (newToken: string, newUserType: string) => {
    //     Cookies.set("auth-token", newToken);
    //     localStorage.setItem("userType", newUserType);
    //     setToken(newToken);
    //     setUserType(newUserType);
    // };
    // const logout =()=>{
    //     Cookies.remove("auth-token");
    //     localStorage.removeItem("userType");
    //     setToken(null);
    //     setUserType(null);
    // }
    return (
        <AuthContext.Provider value={{ token, setToken, userType, setUserType }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};