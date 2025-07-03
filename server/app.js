import e from "express";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

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

export default app