import e from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { userInformation } from "../controllers/userController";

const userRouter = e.Router();

userRouter.get("/me", authMiddleware, userInformation)

export default userRouter;
