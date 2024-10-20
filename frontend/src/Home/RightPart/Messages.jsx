import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage";
import Loading from "../../components/Features/Loading";
import useGetSocketMessage from "../../context/useGetSocketMessage";

const Messages = () => {
    const { loading, message } = useGetMessage();
    const lastMsgRef = useRef();

    useGetSocketMessage();

    useEffect(() => {
        const scrollToBottom = () => {
            if (lastMsgRef.current) {
                lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
            }
        };
        const timer = setTimeout(scrollToBottom, 100);
        return () => clearTimeout(timer);
    }, [message]);

    return (
        <div
            className="flex-1 overflow-y-auto"
            style={{ minHeight: "calc(92vh - 8vh)" }}
        >
            {loading ? (
                <Loading />
            ) : (
                message.length > 0 &&
                message?.map((message, index) => (
                    <div key={index} ref={lastMsgRef}>
                        <Message message={message} />
                    </div>
                ))
            )}
            {!loading && message.length === 0 && (
                <div className=" text-center mt-[20%]">
                    <p>Say! Hi to start conversation</p>
                </div>
            )}
        </div>
    );
};

export default Messages;
