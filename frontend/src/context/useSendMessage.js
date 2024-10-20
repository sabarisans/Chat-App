import { useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { message, setMessage, selectedConversation } = useConversation();
    const sendMessage = async (msg) => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                `/chat/send/${selectedConversation._id}`,
                { message: msg }
            );
            setMessage([...message, data.newMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
};

export default useSendMessage;
