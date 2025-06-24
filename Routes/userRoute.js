import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
} from "./../Controllers/userController.js";
import adminAuth from "./../Middleware/adminAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

export default userRouter;
