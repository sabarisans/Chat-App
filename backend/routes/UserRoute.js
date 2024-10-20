import express from "express";
import {
    allUsers,
    logIn,
    logOut,
    signUp,
} from "../controllers/UserController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
const router = express.Router();

router.get("/all-users", jwtAuth, allUsers);
router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);

export default router;
