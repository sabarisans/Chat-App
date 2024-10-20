import React, { useEffect } from "react";
import { useSocket } from "./SocketContext";
import useConversation from "../zustand/useConversation";
import notificationAudio from "../assets/audio/notification.mp3";

const useGetSocketMessage = () => {
    const { socket } = useSocket();
    const { message, setMessage } = useConversation();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            const notification = new Audio(notificationAudio);
            notification.play();
            setMessage([...message, newMessage]);

            if (Notification.permission === "granted") {
                const notificationInstance = new Notification("New Message", {
                    body: newMessage.message,
                    icon: "/path/to/icon.png",
                });

                notificationInstance.onclick = () => {
                    window.location.href = "http://localhost:5173";
                };
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        const notificationInstance = new Notification(
                            "New Message",
                            {
                                body: newMessage.message,
                                icon: "/path/to/icon.png",
                            }
                        );

                        notificationInstance.onclick = () => {
                            window.location.href = "http://localhost:5173";
                        };
                    }
                });
            }
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, message, setMessage]);
};

export default useGetSocketMessage;
