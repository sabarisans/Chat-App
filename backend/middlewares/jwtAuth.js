import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";

const jwtAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token , authorization denied",
            });
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({
                success: false,
                message: "Invalid token , authorization denied",
            });
        }
        const user = await userModel
            .findById(decode.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
export default jwtAuth
