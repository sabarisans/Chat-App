import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocket } from "../../context/SocketContext";

const User = ({ user }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { fullName, email, _id } = user;
    const isSelected = selectedConversation?._id === _id;
    const { socket, onlineUsers } = useSocket();
    const isOnline = onlineUsers.includes(_id);
    
    return (
        <div
            className={`hover:bg-slate-600 duration-300 ${
                isSelected ? "bg-slate-700" : ""
            }`}
            onClick={() => setSelectedConversation(user)}
        >
            <div className="flex space-x-4 px-8 py-3 hover:bg-slate-800 duration-300 cursor-pointer">
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div className="">
                    <h1 className="font-bold">{fullName}</h1>
                    <span>{email}</span>
                </div>
            </div>
        </div>
    );
};

export default User;
