import jwt from "jsonwebtoken";

const createTokenAndCookie = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
    });
};

export default createTokenAndCookie;
