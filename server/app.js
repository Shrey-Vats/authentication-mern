import e from "express";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";

const app = e();

app.use(e.json())
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);;
app.use(cookieParser());

app.use("/api/", authRouter)
app.use("/app/", userRouter)

export default app