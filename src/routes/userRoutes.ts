import { Router } from "express";
import { deleteAccount } from "../controllers/userController";
import { validateToken } from "../middlewares/validateTokenMiddleware";

const router = Router();

router.delete("/delete", validateToken, deleteAccount);

export default router;
