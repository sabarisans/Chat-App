import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage";

const TypeSend = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendMessage(message);
        setMessage("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex space-x-4 h-[8vh] text-center items-center justify-center bg-gray-800">
                <div className="w-[70%]">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type here"
                        className="input input-bordered w-full"
                    />
                </div>
                <button>
                    <IoSend className="text-3xl" />
                </button>
            </div>
        </form>
    );
};

export default TypeSend;
