import mongoose from "mongoose";
import messageModel from "./MessageModel.js";
import userModel from "./UserModel.js";

const conversationSchema = mongoose.Schema(
    {
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: userModel }],
        messages: [{ type: mongoose.Schema.Types.ObjectId, ref: messageModel,default:[] }],
    },
    { timestamps: true }
);

const conversationModel = mongoose.model("Conversations", conversationSchema);

export default conversationModel;
