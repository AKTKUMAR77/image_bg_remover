import express, { Router } from "express";
import { clerkWebHooks, userCredit } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebHooks);
userRouter.get("/credits", authUser, userCredit);

export default userRouter;
