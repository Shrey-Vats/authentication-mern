import e from "express";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";

const app = e();

app.use(e.json())
app.use(cors());

app.use("/api/", authRouter)

export default app