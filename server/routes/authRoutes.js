import e from "express";
import { registerController, loginController, logoutController } from "../controllers/authController.js";
import { registerValidation, loginValidation } from "../validations/authValidation.js";

const authRouter = e.Router();

authRouter.post("/register", registerValidation, registerController);
authRouter.post("/login", loginValidation, loginController);
authRouter.get("/logout", logoutController)

export default authRouter;
