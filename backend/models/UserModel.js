import mongoose from "mongoose";
const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

const userModel = mongoose.model("Users", userSchema);

export default userModel;
