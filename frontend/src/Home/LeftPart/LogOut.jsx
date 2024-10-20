import axios from "axios";
import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthProvider";
import { LOCAL_CONSTANT } from "../../constant/LocalConstant";
import toast from "react-hot-toast";
const LogOut = () => {
    const [loading, setLoading] = useState(false);
    const [authUser, setAuthUser] = useAuth();

    const handleLogout = async () => {
        setLoading(true);
        try {
            await axios.post("/user/logout");
            Cookies.remove(LOCAL_CONSTANT.TOKEN);
            localStorage.removeItem(LOCAL_CONSTANT.USER);
            setAuthUser(null);
            toast.success("Logout successfully");
            window.location.reload();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pb-3">
            <BiLogOutCircle
                className={`text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full px-2 ml-2 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={!loading ? handleLogout : undefined}
            />
        </div>
    );
};

export default LogOut;
