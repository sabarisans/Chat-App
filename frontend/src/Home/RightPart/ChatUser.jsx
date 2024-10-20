import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocket } from "../../context/SocketContext";
import { CiMenuFries } from "react-icons/ci";

const ChatUser = () => {
    const { selectedConversation } = useConversation();
    const { onlineUsers } = useSocket();
    const getOnlineUsers = (userId) => {
        return onlineUsers.includes(userId) ? "Online" : "Offline";
    };
    return (
        <div className="relative flex space-x-3 items-center justify-center bg-slate-800 hover:bg-gray-700 duration-300 h-[8vh]">
            <label
                htmlFor="my-drawer-2"
                className="btn btn-ghost drawer-button lg:hidden absolute left-5"
            >
                <CiMenuFries className="text-white text-xl" />
            </label>
            <div
                className={`avatar ${getOnlineUsers(
                    selectedConversation?._id
                )?.toLowerCase()}`}
            >
                <div className="w-12 md:w-14 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className="">
                <h1 className="text-xl">{selectedConversation?.fullName}</h1>
                <span className="text-sm">
                    {getOnlineUsers(selectedConversation._id)}
                </span>
            </div>
        </div>
    );
};

export default ChatUser;
