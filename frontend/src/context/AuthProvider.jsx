import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { LOCAL_CONSTANT } from "../constant/LocalConstant";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        const token = Cookies.get(LOCAL_CONSTANT.TOKEN);
        const user = localStorage.getItem(LOCAL_CONSTANT.USER);
        
        if (token) {
            try {
                const parsedUser = user ? JSON.parse(user) : null;
                setAuthUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
