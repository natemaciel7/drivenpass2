import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRouter from "./routes/healthRoute";
import authRouter from "./routes/authRoutes";
import credentialRouter from "./routes/credentialRoutes";
import userRouter from "./routes/userRoutes";
import handleErrors from "./middlewares/handleErrorsMiddleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(healthRouter);
app.use(authRouter);
app.use(credentialRouter);
app.use(userRouter);

app.use(handleErrors);

export default app;
