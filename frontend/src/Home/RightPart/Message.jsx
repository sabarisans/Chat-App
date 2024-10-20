import React from "react";
import { LOCAL_CONSTANT } from "../../constant/LocalConstant";

const Message = ({ message }) => {
    const authUser = JSON.parse(localStorage.getItem(LOCAL_CONSTANT.USER)).user;
    const itsMe = message.senderId == authUser.id;
    const chatName = itsMe ? "chat-end" : "chat-start";
    const chatColor = itsMe ? "chat-bubble-info" : "chat-bubble-warning";
    const createdAt = new Date(message.createdAt);
    const formattedTime = createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return (
        <div>
            <div className="p-4">
                <div className={`chat ${chatName}`}>
                    <div className={`chat-bubble ${chatColor}`}>
                        {message.message}
                    </div>
                    <div className="chat-footer">{formattedTime}</div>
                </div>
            </div>
        </div>
    );
};

export default Message;