import Messages from "./Messages";
import TypeSend from "./TypeSend";
import ChatUser from "./ChatUser";
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import NoChatSelected from "../../components/Features/NoChatSelected";

function Right() {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        return setSelectedConversation(null);
    }, [setSelectedConversation]);
    return (
        <div className="w-full bg-slate-900 text-gray-300">
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <div className="">
                    <ChatUser />
                    <div
                        className="flex-1 overflow-y-auto"
                        style={{ maxHeight: "calc(92vh - 8vh)" }}
                    >
                        <Messages />
                    </div>
                    <TypeSend />
                </div>
            )}
        </div>
    );
}

export default Right;
