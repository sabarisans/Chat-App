import { useEffect, useState } from "react";
import axios from "axios"; 
import useConversation from "../zustand/useConversation";

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const { message, setMessage, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessage = async () => {
            if (!selectedConversation?._id) return;
            setLoading(true);
            try {
                const { data } = await axios.get(
                    `/chat/get/${selectedConversation._id}`
                );
                setMessage(data.userMessage);
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setLoading(false);
            }
        };

        getMessage();
    }, [selectedConversation, setMessage]);

    return { loading, message };
};

export default useGetMessage;
