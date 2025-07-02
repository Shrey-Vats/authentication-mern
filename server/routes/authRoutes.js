import e from "express";
import { registerController, loginController } from "../controllers/authController";
import { registerValidation, loginValidation } from "../validations/authValidation";

const authRouter = e.Router();

authRouter.post("/register", registerValidation, registerController);
authRouter.post("/login", loginValidation, loginController);


export default authRouter;
