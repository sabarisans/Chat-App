import createTokenAndCookie from "../utils/generateToken.js";
import userModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = await userModel.create({
            email,
            password: hashedPassword,
            fullName,
        });

        if (newUser) {
            createTokenAndCookie(newUser._id, res);
            return res.status(201).json({
                success: true,
                message: "User created successfully",
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    fullName: newUser.fullName,
                },
            });
        }
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid email" });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid email or password" });
        }

        createTokenAndCookie(user._id, res);

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
            },
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

export const logOut = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
    });

    return res
        .status(200)
        .json({ success: true, message: "Logged out successfully" });
};

export const allUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUser = await userModel
            .find({ _id: { $ne: loggedInUser } })
            .select("-password");
        return res.status(200).json({
            success: true,
            message: "Fetch all users successfully",
            users: filteredUser,
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
