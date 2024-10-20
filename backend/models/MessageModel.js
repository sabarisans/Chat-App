import mongoose from "mongoose";
import userModel from "./UserModel.js";

const messageSchema = mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: userModel,
            require: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: userModel,
            require: true,
        },
        message: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

const messageModel = mongoose.model("Messages", messageSchema);

export default messageModel;
