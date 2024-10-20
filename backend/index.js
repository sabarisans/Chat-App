import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import UserRouter from "./routes/UserRoute.js";
import MessageRouter from "./routes/MessageRoute.js";
import cookieParser from "cookie-parser";
import { server,app } from "./socket/server.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGODB = process.env.MONGODB_URL;

//middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.options("*", cors());

//route
app.use("/user", UserRouter);
app.use("/chat", MessageRouter);

mongoose
    .connect(MONGODB)
    .then(() => {
        console.log("Connect to MongoDB");
    })
    .catch((error) => {
        console.log("MongoDB ERROR", error);
    });

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`,);
});
