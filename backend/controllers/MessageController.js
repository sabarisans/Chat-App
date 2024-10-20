import conversationModel from "../models/ConversationModel.js";
import messageModel from "../models/MessageModel.js";
import { getReceiverSocketId, io } from "../socket/server.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await conversationModel.findOne({
            members: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = await conversationModel.create({
                members: [senderId, receiverId],
            });
        }

        const newMessage = await messageModel.create({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await conversation.save();

        const receivedSocketId = getReceiverSocketId(receiverId);

        if (receivedSocketId) {
            io.to(receivedSocketId).emit("newMessage", newMessage);
        }

        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
            newMessage,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id;

        let conversation = await conversationModel
            .findOne({
                members: { $all: [senderId, chatUser] },
            })
            .populate("messages");

        if (!conversation) {
            return res.status(201).json({
                success: true,
                message: "No message",
                userMessage: [],
            });
        }

        const userMessage = conversation.messages;

        return res.status(201).json({
            success: true,
            message: "Message received successfully",
            userMessage,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
