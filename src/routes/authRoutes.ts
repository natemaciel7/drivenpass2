import { Router } from "express";
import { signUp, signIn } from "../controllers/authController";
import { validateSchema } from "../middlewares/validateSchemaMiddleware";
import { signUpSchema } from "../schemas/signUpSchema";
import { signInSchema } from "../schemas/signInSchema";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
authRouter.post("/sign-in", validateSchema(signInSchema), signIn);

export default authRouter;
