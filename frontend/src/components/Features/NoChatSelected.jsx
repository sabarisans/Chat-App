import React from "react";
import { useAuth } from "../../context/AuthProvider";
import { CiMenuFries } from "react-icons/ci";
const NoChatSelected = () => {
    const [authUser] = useAuth();
    const { fullName } = authUser.user;
    return (
        <>
            <div className="relative">
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-ghost drawer-button lg:hidden absolute left-5"
                >
                    <CiMenuFries className="text-white text-xl" />
                </label>
            </div>
            <div className="flex h-screen items-center justify-center">
                <h1 className="text-center">
                    Hello,{" "}
                    <span className="font-semibold text-xl">{fullName}</span>
                    <br />
                    {/* You haven't selected a chat yet. */}
                    Start a conversation with your contacts to connect and
                    share!
                </h1>
            </div>
        </>
    );
};

export default NoChatSelected;
